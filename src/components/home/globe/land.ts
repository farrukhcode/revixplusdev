import topology from "world-atlas/land-110m.json";

// Natural Earth 1:110m land (public domain) via world-atlas, as TopoJSON:
// arcs are quantized and delta-encoded; polygons reference arcs by index (~i = reversed).
interface Topology {
  transform: { scale: [number, number]; translate: [number, number] };
  arcs: [number, number][][];
  objects: { land: { geometries: { type: "Polygon" | "MultiPolygon"; arcs: number[][] | number[][][] }[] } };
}
const topo = topology as unknown as Topology;

export type LonLat = [lon: number, lat: number];

/** Every coastline arc as a [lon, lat] polyline. */
export const coastlines: LonLat[][] = topo.arcs.map((arc) => {
  const [sx, sy] = topo.transform.scale;
  const [tx, ty] = topo.transform.translate;
  let x = 0;
  let y = 0;
  return arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * sx + tx, y * sy + ty];
  });
});

/** Land polygons' rings, with arcs stitched end to end. */
function landRings(): LonLat[][] {
  const rings: LonLat[][] = [];
  for (const g of topo.objects.land.geometries) {
    const polygons = (g.type === "Polygon" ? [g.arcs] : g.arcs) as number[][][];
    for (const polygon of polygons) {
      for (const ring of polygon) {
        const pts: LonLat[] = [];
        ring.forEach((i, k) => {
          const arc = i < 0 ? [...coastlines[~i]].reverse() : coastlines[i];
          pts.push(...(k === 0 ? arc : arc.slice(1)));
        });
        rings.push(pts);
      }
    }
  }
  return rings;
}

/** Rasterizes land into an equirectangular mask once; returns a cheap lookup. */
export function landMask(width = 720) {
  const height = width / 2;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return () => true;
  ctx.beginPath();
  for (const ring of landRings()) {
    ring.forEach(([lon, lat], i) => {
      const x = ((lon + 180) / 360) * width;
      const y = ((90 - lat) / 180) * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
  }
  ctx.fill("evenodd");
  const alpha = ctx.getImageData(0, 0, width, height).data;
  return (lat: number, lon: number) => {
    const x = Math.min(width - 1, Math.floor(((lon + 180) / 360) * width));
    const y = Math.min(height - 1, Math.floor(((90 - lat) / 180) * height));
    return alpha[(y * width + x) * 4 + 3] > 127;
  };
}
