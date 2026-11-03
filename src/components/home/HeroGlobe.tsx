// biome-ignore-all lint/a11y/noStaticElementInteractions: <primitive> handlers are WebGL raycast events, not DOM; the wrapper drag is a pointer-only enhancement on a decorative scene
"use client";

import { Canvas, type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import {
  BackSide,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  ConeGeometry,
  CubicBezierCurve3,
  CylinderGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  InstancedMesh,
  Line,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Points,
  RingGeometry,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
} from "three";
import { coastlines, landMask } from "./globe/land";

/**
 * The hero system: a map globe with real cloud data center locations, relay
 * satellites, a Starlink-style satellite train and the occasional launch from
 * Cape Canaveral. Drag to rotate (with inertia), hover for labels and live
 * coordinates, click a data center / satellite / the ocean for a burst.
 * Colors come from the theme tokens and follow the light/dark switch.
 */

// ---------------------------------------------------------------------------
// Data

const TILT = 0.45;
const SAMPLES = 96; // points per arc
const TRAIL = 8; // sprites per packet (head + tail)
const DRAG = 0.007; // radians per dragged pixel
const Y_AXIS = new Vector3(0, 1, 0);
const Z_AXIS = new Vector3(0, 0, 1);

// Publicly documented locations of each provider's data center / region.
const SITES = [
  { name: "RevixPlus HQ", place: "Lahore", lat: 31.52, lon: 74.36, hq: true },
  { name: "AWS us-east-1", place: "Ashburn, Virginia", lat: 39.04, lon: -77.49, hq: false },
  { name: "Google Cloud", place: "The Dalles, Oregon", lat: 45.6, lon: -121.18, hq: false },
  { name: "Meta", place: "Luleå, Sweden", lat: 65.58, lon: 22.15, hq: false },
  { name: "Cloudflare", place: "Frankfurt", lat: 50.11, lon: 8.68, hq: false },
  { name: "DigitalOcean SGP1", place: "Singapore", lat: 1.35, lon: 103.82, hq: false },
];
const PAD = { name: "SpaceX", place: "Cape Canaveral", lat: 28.49, lon: -80.58 };
const LABELS = [...SITES, PAD];
const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 2],
  [4, 3],
  [4, 1],
];
const ORBITS: { r: number; rot: [number, number, number]; speed: number; sats: number }[] = [
  { r: 1.2, rot: [0.42, 0, 0.25], speed: 0.26, sats: 2 },
  { r: 1.3, rot: [-0.55, 0.4, -0.3], speed: 0.19, sats: 1 },
  { r: 1.4, rot: [0.95, -0.3, 0.1], speed: 0.14, sats: 1 },
];
const SAT_COUNT = ORBITS.reduce((n, o) => n + o.sats, 0);
const TRAIN = { count: 14, r: 1.11, spacing: 0.05, speed: 0.1, incl: (53 * Math.PI) / 180 };
const LAUNCH = { every: 16, flight: 8, exhaust: 18 };

// ---------------------------------------------------------------------------
// Theme

interface Palette {
  dot: Color;
  coast: Color;
  grid: Color;
  body: Color;
  rim: Color;
  a: Color; // cyan: outbound data
  b: Color; // violet: brand
  c: Color; // lime: HQ, uplinks
  d: Color; // pink: highlights
  e: Color; // orange: rocket exhaust
  metal: Color;
  panel: Color;
}

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const c = (name: string) => new Color(s.getPropertyValue(name).trim() || "#888");
  return {
    dot: c("--subtle-foreground"),
    coast: c("--violet"),
    grid: c("--border-strong"),
    body: c("--card"),
    rim: c("--violet"),
    a: c("--cyan"),
    b: c("--violet"),
    c: c("--lime"),
    d: c("--pink"),
    e: c("--orange"),
    metal: c("--muted-foreground"),
    panel: c("--blue"),
  };
}

function usePalette() {
  const [palette, setPalette] = useState<Palette | null>(null);
  useEffect(() => {
    const update = () => setPalette(readPalette());
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return palette;
}

// ---------------------------------------------------------------------------
// Geometry helpers

function toVec(lat: number, lon: number, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function latLonOf(v: Vector3) {
  const n = v.clone().normalize();
  const lat = 90 - (Math.acos(n.y) * 180) / Math.PI;
  let lon = (Math.atan2(n.z, -n.x) * 180) / Math.PI - 180;
  if (lon < -180) lon += 360;
  return { lat, lon };
}

function arcPoints(a: Vector3, b: Vector3) {
  const lift = 1 + a.distanceTo(b) * 0.32;
  const c1 = a.clone().lerp(b, 0.25).normalize().multiplyScalar(lift);
  const c2 = a.clone().lerp(b, 0.75).normalize().multiplyScalar(lift);
  return new CubicBezierCurve3(a, c1, c2, b).getSpacedPoints(SAMPLES - 1);
}

/** Sample a polyline (evenly spaced points) at u in [0, 1] into out[i]. */
function sample(pts: Vector3[], u: number, out: Float32Array, i: number) {
  const f = Math.min(0.9999, Math.max(0, u)) * (pts.length - 1);
  const i0 = Math.floor(f);
  const w = f - i0;
  const a = pts[i0];
  const b = pts[i0 + 1];
  out[i * 3] = a.x + (b.x - a.x) * w;
  out[i * 3 + 1] = a.y + (b.y - a.y) * w;
  out[i * 3 + 2] = a.z + (b.z - a.z) * w;
}

function fibonacciSphere(n: number) {
  const out: Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    out.push(new Vector3(Math.cos(golden * i) * r, y, Math.sin(golden * i) * r));
  }
  return out;
}

/** Launch trajectory: a vertical climb that pitches over east (gravity turn) to orbit height. */
function rocketPoint(up: Vector3, east: Vector3, u: number, out: Vector3) {
  const downrange = u ** 1.6 * 0.95;
  const altitude = 0.02 + 0.36 * (1 - (1 - u) ** 2.2);
  return out
    .copy(up)
    .multiplyScalar(Math.cos(downrange))
    .addScaledVector(east, Math.sin(downrange))
    .normalize()
    .multiplyScalar(1 + altitude);
}

// ---------------------------------------------------------------------------
// Shaders (all end with Three's colorspace chunk so token colors render exactly)

const dotShader = {
  vertexShader: /* glsl */ `
    uniform float uSize; uniform float uPR;
    varying float vFacing;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vFacing = normalize(normalMatrix * position).z;
      gl_PointSize = uSize * uPR / -mv.z;
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor; uniform float uOpacity;
    varying float vFacing;
    void main() {
      vec2 c = gl_PointCoord - 0.5;
      if (dot(c, c) > 0.25) discard;
      gl_FragColor = vec4(uColor, uOpacity * smoothstep(-0.1, 0.45, vFacing));
      #include <colorspace_fragment>
    }`,
};

const glowShader = {
  vertexShader: /* glsl */ `
    attribute float aSize; attribute float aAlpha; attribute float aMix;
    uniform float uPR;
    varying float vAlpha; varying float vMix;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * uPR / -mv.z;
      vAlpha = aAlpha; vMix = aMix;
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform vec3 uD; uniform vec3 uE; uniform vec3 uF;
    varying float vAlpha; varying float vMix;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      float a = pow(smoothstep(0.5, 0.0, d), 1.6) * vAlpha;
      if (a < 0.01) discard;
      vec3 col = vMix < 0.5 ? uA : vMix < 1.5 ? uB : vMix < 2.5 ? uC : vMix < 3.5 ? uD : vMix < 4.5 ? uE : uF;
      gl_FragColor = vec4(col, a);
      #include <colorspace_fragment>
    }`,
};
// Sprite color slots (aMix)
const CYAN = 0;
const VIOLET = 1;
const LIME = 2;
const PINK = 3;
const ORANGE = 4;
const METAL = 5;

const bodyShader = {
  vertexShader: /* glsl */ `
    varying vec3 vN;
    void main() {
      vN = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 uBody; uniform vec3 uRim;
    varying vec3 vN;
    void main() {
      float f = pow(1.0 - clamp(vN.z, 0.0, 1.0), 2.2);
      gl_FragColor = vec4(mix(uBody, uRim, f * 0.5), 1.0);
      #include <colorspace_fragment>
    }`,
};

const atmosphereShader = {
  vertexShader: bodyShader.vertexShader,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor; uniform float uIntensity;
    varying vec3 vN;
    void main() {
      gl_FragColor = vec4(uColor, pow(clamp(-vN.z, 0.0, 1.0), 1.5) * uIntensity);
      #include <colorspace_fragment>
    }`,
};

// ---------------------------------------------------------------------------
// Scene

type Disposable = { dispose: () => void };

function spriteCloud(count: number, material: ShaderMaterial, track: <T extends Disposable>(o: T) => T) {
  const geo = track(new BufferGeometry());
  const attr = (n: number) => new BufferAttribute(new Float32Array(count * n), n);
  const pos = attr(3);
  const size = attr(1);
  const alpha = attr(1);
  const mix = attr(1);
  geo.setAttribute("position", pos);
  geo.setAttribute("aSize", size);
  geo.setAttribute("aAlpha", alpha);
  geo.setAttribute("aMix", mix);
  const points = new Points(geo, material);
  points.frustumCulled = false; // positions move every frame
  return {
    points,
    pos: pos.array as Float32Array,
    size: size.array as Float32Array,
    alpha: alpha.array as Float32Array,
    mix: mix.array as Float32Array,
    flush: () => {
      for (const a of [pos, size, alpha, mix]) a.needsUpdate = true;
    },
  };
}

function buildScene(p: Palette, dotCount: number, pr: number) {
  const disposables: Disposable[] = [];
  const track = <T extends Disposable>(o: T) => {
    disposables.push(o);
    return o;
  };
  const glow = track(
    new ShaderMaterial({
      ...glowShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uA: { value: p.a },
        uB: { value: p.b },
        uC: { value: p.c },
        uD: { value: p.d },
        uE: { value: p.e },
        uF: { value: p.metal },
        uPR: { value: pr },
      },
    }),
  );
  const unitBox = track(new BoxGeometry(1, 1, 1));
  const hitMat = track(new MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
  const ringGeo = track(new RingGeometry(0.03, 0.038, 40));
  const metalMat = track(new MeshStandardMaterial({ color: p.metal, metalness: 0.55, roughness: 0.35 }));

  // --- Globe surface (lives inside the spinning group) ---
  const surface = new Group();

  const body = new Mesh(
    track(new SphereGeometry(0.99, 64, 64)),
    track(
      new ShaderMaterial({ ...bodyShader, uniforms: { uBody: { value: p.body }, uRim: { value: p.rim } } }),
    ),
  );

  const atmosphere = new Mesh(
    track(new SphereGeometry(1.2, 48, 48)),
    track(
      new ShaderMaterial({
        ...atmosphereShader,
        side: BackSide,
        transparent: true,
        depthWrite: false,
        uniforms: { uColor: { value: p.rim }, uIntensity: { value: 0.55 } },
      }),
    ),
  );

  // Graticule every 30 degrees
  const grid: number[] = [];
  const push = (a: Vector3, b: Vector3) => grid.push(a.x, a.y, a.z, b.x, b.y, b.z);
  for (const lat of [-60, -30, 0, 30, 60]) {
    for (let i = 0; i < 96; i++)
      push(toVec(lat, -180 + (i * 360) / 96, 1.001), toVec(lat, -180 + ((i + 1) * 360) / 96, 1.001));
  }
  for (let lon = -180; lon < 180; lon += 30) {
    for (let i = 0; i < 48; i++)
      push(toVec(-90 + (i * 180) / 48, lon, 1.001), toVec(-90 + ((i + 1) * 180) / 48, lon, 1.001));
  }
  const gridGeo = track(new BufferGeometry());
  gridGeo.setAttribute("position", new Float32BufferAttribute(grid, 3));
  surface.add(
    new LineSegments(
      gridGeo,
      track(new LineBasicMaterial({ color: p.grid, transparent: true, opacity: 0.35, depthWrite: false })),
    ),
  );

  // Coastlines
  const coast: number[] = [];
  for (const arc of coastlines) {
    for (let i = 1; i < arc.length; i++) {
      if (Math.abs(arc[i][0] - arc[i - 1][0]) > 90) continue; // antimeridian seam
      const a = toVec(arc[i - 1][1], arc[i - 1][0], 1.003);
      const b = toVec(arc[i][1], arc[i][0], 1.003);
      coast.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  const coastGeo = track(new BufferGeometry());
  coastGeo.setAttribute("position", new Float32BufferAttribute(coast, 3));
  surface.add(
    new LineSegments(
      coastGeo,
      track(new LineBasicMaterial({ color: p.coast, transparent: true, opacity: 0.9 })),
    ),
  );

  // Land dots: an even lattice, kept only where the mask says land
  const isLand = landMask();
  const land: number[] = [];
  for (const v of fibonacciSphere(dotCount)) {
    const { lat, lon } = latLonOf(v);
    if (isLand(lat, lon)) land.push(v.x * 1.004, v.y * 1.004, v.z * 1.004);
  }
  const landGeo = track(new BufferGeometry());
  landGeo.setAttribute("position", new Float32BufferAttribute(land, 3));
  surface.add(
    new Points(
      landGeo,
      track(
        new ShaderMaterial({
          ...dotShader,
          transparent: true,
          depthWrite: false,
          uniforms: {
            uColor: { value: p.dot },
            uOpacity: { value: 0.9 },
            uSize: { value: 6 },
            uPR: { value: pr },
          },
        }),
      ),
    ),
  );

  // Data centers: clusters of racks standing on the surface
  const padMat = track(
    new MeshBasicMaterial({ color: p.b, transparent: true, opacity: 0.45, depthWrite: false }),
  );
  const padGeo = track(new CylinderGeometry(0.075, 0.075, 0.004, 28));
  const hitSphere = track(new SphereGeometry(0.11, 12, 12));
  const sites = SITES.map((site) => {
    const v = toVec(site.lat, site.lon);
    const group = new Group();
    group.position.copy(v);
    group.quaternion.setFromUnitVectors(Y_AXIS, v);
    group.add(new Mesh(padGeo, padMat));
    const capMat = track(new MeshBasicMaterial({ color: site.hq ? p.c : p.a }));
    const racks: [number, number, number][] = site.hq
      ? [
          [-0.03, -0.025, 0.11],
          [0.03, -0.025, 0.085],
          [-0.03, 0.03, 0.07],
          [0.03, 0.03, 0.13],
        ]
      : [
          [-0.028, -0.02, 0.07],
          [0.028, -0.02, 0.05],
          [0, 0.03, 0.09],
        ];
    for (const [x, z, h] of racks) {
      const rack = new Mesh(unitBox, metalMat);
      rack.scale.set(0.034, h, 0.034);
      rack.position.set(x, h / 2, z);
      const cap = new Mesh(unitBox, capMat);
      cap.scale.set(0.036, 0.006, 0.036);
      cap.position.set(x, h + 0.003, z);
      group.add(rack, cap);
    }
    group.add(new Mesh(hitSphere, hitMat));

    const ring = new Mesh(
      ringGeo,
      track(
        new MeshBasicMaterial({
          color: site.hq ? p.c : p.a,
          transparent: true,
          side: DoubleSide,
          depthWrite: false,
        }),
      ),
    );
    ring.position.copy(v).multiplyScalar(1.004);
    ring.quaternion.setFromUnitVectors(Z_AXIS, v);
    surface.add(ring);
    return { group, ring, v };
  });

  // Launch pad at Cape Canaveral: a small tower next to the pad
  const padUp = toVec(PAD.lat, PAD.lon);
  const padEast = new Vector3().crossVectors(Y_AXIS, padUp).normalize();
  const launchPad = new Group();
  launchPad.position.copy(padUp);
  launchPad.quaternion.setFromUnitVectors(Y_AXIS, padUp);
  const tower = new Mesh(unitBox, metalMat);
  tower.scale.set(0.012, 0.09, 0.012);
  tower.position.set(0.025, 0.045, 0);
  launchPad.add(
    new Mesh(padGeo, track(new MeshBasicMaterial({ color: p.e, transparent: true, opacity: 0.5 }))),
    tower,
  );
  surface.add(launchPad);

  // Ground network: arcs between sites, packets both ways
  const arcs = LINKS.map(([from, to]) => arcPoints(sites[from].v, sites[to].v));
  for (const pts of arcs) {
    const g = track(new BufferGeometry().setFromPoints(pts));
    const colors = new Float32Array(pts.length * 3);
    const tmp = new Color();
    for (let i = 0; i < pts.length; i++) {
      tmp.copy(p.a).lerp(p.b, i / (pts.length - 1));
      colors.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    g.setAttribute("color", new Float32BufferAttribute(colors, 3));
    surface.add(
      new Line(g, track(new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.55 }))),
    );
  }
  const arcPackets = LINKS.flatMap((_, link) => [
    { link, dir: 1, t: Math.random(), speed: 0.14 + Math.random() * 0.07 },
    { link, dir: -1, t: Math.random(), speed: 0.11 + Math.random() * 0.07 },
  ]);
  const arcCloud = spriteCloud(arcPackets.length * TRAIL, glow, track);
  surface.add(arcCloud.points);

  // Rocket: body, nose and fins, flying a gravity turn from the pad with an exhaust plume
  const rocket = new Group();
  const rocketMat = track(new MeshStandardMaterial({ color: p.metal, metalness: 0.4, roughness: 0.35 }));
  const hull = new Mesh(track(new CylinderGeometry(0.011, 0.011, 0.07, 14)), rocketMat);
  const nose = new Mesh(track(new ConeGeometry(0.011, 0.026, 14)), rocketMat);
  nose.position.y = 0.048;
  const finA = new Mesh(unitBox, rocketMat);
  finA.scale.set(0.036, 0.02, 0.002);
  finA.position.y = -0.03;
  const finB = finA.clone();
  finB.rotation.y = Math.PI / 2;
  rocket.add(hull, nose, finA, finB);
  rocket.visible = false;
  surface.add(rocket);
  const exhaust = spriteCloud(LAUNCH.exhaust, glow, track);
  surface.add(exhaust.points);

  // Hover marker, click ripples and a temporary link to wherever was clicked
  const marker = new Mesh(
    track(new RingGeometry(0.035, 0.048, 40)),
    track(new MeshBasicMaterial({ color: p.a, transparent: true, side: DoubleSide, depthWrite: false })),
  );
  marker.visible = false;
  surface.add(marker);
  const ripples = Array.from({ length: 3 }, () => {
    const m = new Mesh(
      ringGeo,
      track(new MeshBasicMaterial({ color: p.d, transparent: true, side: DoubleSide, depthWrite: false })),
    );
    m.visible = false;
    surface.add(m);
    return { mesh: m, start: -10 };
  });
  const tempPts = Array.from({ length: SAMPLES }, () => new Vector3());
  const tempAttr = new BufferAttribute(new Float32Array(SAMPLES * 3), 3);
  const tempGeo = track(new BufferGeometry());
  tempGeo.setAttribute("position", tempAttr);
  const tempMat = track(new LineBasicMaterial({ color: p.d, transparent: true, opacity: 0 }));
  const tempLine = new Line(tempGeo, tempMat);
  tempLine.frustumCulled = false;
  surface.add(tempLine);
  const tempCloud = spriteCloud(TRAIL, glow, track);
  surface.add(tempCloud.points);
  const temp = { pts: tempPts, attr: tempAttr, mat: tempMat, cloud: tempCloud, start: -10 };

  // --- Relay satellites on three orbits (fixed in space, not spinning with the globe) ---
  const orbitLineGeo = (r: number) =>
    track(
      new BufferGeometry().setFromPoints(
        Array.from(
          { length: 160 },
          (_, i) =>
            new Vector3(Math.cos((i / 160) * Math.PI * 2) * r, 0, Math.sin((i / 160) * Math.PI * 2) * r),
        ),
      ),
    );
  const satBodyMat = track(new MeshStandardMaterial({ color: p.metal, metalness: 0.75, roughness: 0.3 }));
  const panelMat = track(
    new MeshStandardMaterial({
      color: p.panel,
      metalness: 0.35,
      roughness: 0.4,
      emissive: p.panel,
      emissiveIntensity: 0.25,
    }),
  );
  const dishGeo = track(new ConeGeometry(0.03, 0.03, 16, 1, true));
  const beaconGeo = track(new SphereGeometry(0.012, 8, 8));
  const beaconMat = track(new MeshBasicMaterial({ color: p.d }));
  const satHit = track(new SphereGeometry(0.15, 12, 12));
  let satIndex = 0;
  const orbits = ORBITS.map((o) => {
    const lineMat = track(
      new LineBasicMaterial({ color: p.grid, transparent: true, opacity: 0.55, depthWrite: false }),
    );
    const line = new LineLoop(orbitLineGeo(o.r), lineMat);
    const sats = Array.from({ length: o.sats }, (_, k) => {
      const model = new Group();
      const bodyMesh = new Mesh(unitBox, satBodyMat);
      bodyMesh.scale.set(0.07, 0.07, 0.11);
      const left = new Mesh(unitBox, panelMat);
      left.scale.set(0.2, 0.006, 0.075);
      left.position.x = -0.145;
      const right = left.clone();
      right.position.x = 0.145;
      const dish = new Mesh(dishGeo, satBodyMat);
      dish.position.y = 0.05;
      const beacon = new Mesh(beaconGeo, beaconMat);
      beacon.position.set(0, 0.04, -0.06);
      model.add(bodyMesh, left, right, dish, beacon, new Mesh(satHit, hitMat));
      return { model, beacon, phase: (k / o.sats) * Math.PI * 2 + satIndex * 0.7, index: satIndex++ };
    });
    return { ...o, line, lineMat, sats };
  });
  const satList = orbits.flatMap((o) => o.sats.map((s) => ({ ...s, orbit: o })));

  // --- Starlink-style train: flat satellites in a line on a low 53 degree orbit ---
  const train = new InstancedMesh(unitBox, panelMat, TRAIN.count);
  train.frustumCulled = false;
  const trainGlints = spriteCloud(TRAIN.count, glow, track);
  const trainGroup = new Group();
  trainGroup.rotation.set(TRAIN.incl, 0, 0.6);
  trainGroup.add(train, trainGlints.points);

  // --- Uplinks: each relay satellite talks to the data center most directly below it ---
  const upAttr = new BufferAttribute(new Float32Array(SAT_COUNT * 6), 3);
  const upGeo = track(new BufferGeometry());
  upGeo.setAttribute("position", upAttr);
  const upMat = track(
    new LineBasicMaterial({ color: p.c, transparent: true, opacity: 0.5, depthWrite: false }),
  );
  const uplinks = new LineSegments(upGeo, upMat);
  uplinks.frustumCulled = false;
  const upCloud = spriteCloud(SAT_COUNT * 2 * 4, glow, track); // up + down packet, 4-sprite tails
  const upPackets = satList.flatMap((_, j) => [
    { sat: j, dir: 1, t: Math.random() },
    { sat: j, dir: -1, t: Math.random() },
  ]);

  return {
    surface,
    body,
    atmosphere,
    sites,
    launchPad,
    padUp,
    padEast,
    rocket,
    exhaust,
    arcs,
    arcPackets,
    arcCloud,
    marker,
    ripples,
    temp,
    orbits,
    satList,
    train,
    trainGlints,
    trainGroup,
    uplinks,
    upAttr,
    upMat,
    upCloud,
    upPackets,
    dispose: () => {
      for (const d of disposables) d.dispose();
      train.dispose();
    },
  };
}

// ---------------------------------------------------------------------------
// Interaction state shared between the DOM drag handlers and the frame loop

interface Controls {
  rotY: number;
  rotX: number;
  velY: number;
  dragging: boolean;
  lastX: number;
  lastY: number;
  idle: number;
  focusY: number | null;
  focusX: number | null;
}

type Hover = { kind: "site" | "sat" | "globe" | null; index: number };

const START_Y = (-(30 + 90) * Math.PI) / 180; // Lahore, Europe and the Gulf face the camera on load

function Network({
  palette,
  dots,
  animate,
  ctrl,
  tipRef,
  labelRefs,
  setCursor,
}: {
  palette: Palette;
  dots: number;
  animate: boolean;
  ctrl: RefObject<Controls>;
  tipRef: RefObject<HTMLDivElement | null>;
  labelRefs: RefObject<(HTMLDivElement | null)[]>;
  setCursor: (c: string) => void;
}) {
  const pr = useThree((s) => s.viewport.dpr);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  const s = useMemo(() => buildScene(palette, dots, pr), [palette, dots, pr]);
  useEffect(() => s.dispose, [s]);

  const globe = useRef<Group>(null);
  const tilt = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const hover = useRef<Hover>({ kind: null, index: -1 });
  const fx = useRef({ site: SITES.map(() => 0), sat: Array.from({ length: SAT_COUNT }, () => 0) });
  const clock = useRef(0);
  const launch = useRef({ start: -100, next: 4 });
  const tipText = useRef("");

  const setHover = (kind: Hover["kind"], index = -1) => {
    hover.current = { kind, index };
    setCursor(kind === "globe" || kind === null ? "grab" : "pointer");
    invalidate();
  };
  // A click that ends a drag is not a click
  const isDrag = (e: ThreeEvent<MouseEvent>) => e.delta > 6;

  const onBodyMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation(); // the planet hides whatever is behind it
    if (!spin.current) return;
    const local = spin.current.worldToLocal(e.point.clone()).normalize();
    s.marker.position.copy(local).multiplyScalar(1.006);
    s.marker.quaternion.setFromUnitVectors(Z_AXIS, local);
    s.marker.visible = true;
    if (hover.current.kind !== "globe") setHover("globe");
    invalidate();
  };
  const onBodyOut = () => {
    s.marker.visible = false;
    if (hover.current.kind === "globe") setHover(null);
  };
  const onBodyClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (isDrag(e) || !spin.current) return;
    const local = spin.current.worldToLocal(e.point.clone()).normalize();
    const r = s.ripples.find((x) => clock.current - x.start > 1.4) ?? s.ripples[0];
    r.start = clock.current;
    r.mesh.position.copy(local).multiplyScalar(1.006);
    r.mesh.quaternion.setFromUnitVectors(Z_AXIS, local);
    // Link the nearest data center to the clicked spot
    let best = 0;
    for (let i = 1; i < s.sites.length; i++)
      if (s.sites[i].v.dot(local) > s.sites[best].v.dot(local)) best = i;
    arcPoints(s.sites[best].v, local).forEach((v, i) => {
      s.temp.pts[i].copy(v);
      s.temp.attr.setXYZ(i, v.x, v.y, v.z);
    });
    s.temp.attr.needsUpdate = true;
    s.temp.start = clock.current;
    fx.current.site[best] = 1;
    invalidate();
  };

  const focusOn = (lat: number, lon: number) => {
    const c = ctrl.current;
    const base = (-(lon + 90) * Math.PI) / 180;
    c.focusY = base + Math.round((c.rotY - base) / (Math.PI * 2)) * Math.PI * 2;
    c.focusX = Math.min(1.0, Math.max(-0.1, ((lat * Math.PI) / 180) * 0.85));
    c.idle = 0;
    invalidate();
  };

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const step = animate ? delta : 0;
    clock.current += delta;
    const t = clock.current;
    const c = ctrl.current;
    const f = fx.current;
    const h = hover.current;

    // --- Rotation: drag, inertia, focus, then idle auto-rotate ---
    if (!c.dragging) {
      c.idle += delta;
      c.rotY += c.velY * delta * 60;
      c.velY *= 0.04 ** delta;
      if (c.focusY !== null) {
        c.rotY += (c.focusY - c.rotY) * Math.min(1, delta * 3.5);
        if (Math.abs(c.focusY - c.rotY) < 0.002) c.focusY = null;
      } else if (animate) {
        const ramp = Math.min(1, Math.max(0, c.idle - 1.2) / 1.5);
        c.rotY += 0.06 * ramp * (h.kind ? 0.3 : 1) * delta;
      }
      if (c.focusX !== null) {
        c.rotX += (c.focusX - c.rotX) * Math.min(1, delta * 3.5);
        if (c.idle > 6) c.focusX = null;
      } else if (c.idle > 2.5) {
        c.rotX += (TILT - c.rotX) * Math.min(1, delta * 0.8);
      }
    }
    if (spin.current) spin.current.rotation.y = c.rotY;
    if (tilt.current) tilt.current.rotation.x = c.rotX;
    globe.current?.updateMatrixWorld(true);

    const decay = Math.exp(-delta * 0.9);
    for (let i = 0; i < f.site.length; i++) f.site[i] *= decay;
    for (let i = 0; i < f.sat.length; i++) f.sat[i] *= decay;

    // --- Ground packets ---
    const ac = s.arcCloud;
    s.arcPackets.forEach((pk, i) => {
      const [from, to] = LINKS[pk.link];
      const boost = Math.max(f.site[from], f.site[to]);
      pk.t = (pk.t + step * pk.speed * (1 + boost * 3)) % 1;
      for (let k = 0; k < TRAIL; k++) {
        const j = i * TRAIL + k;
        let u = pk.t - k * 0.012;
        if (u < 0) u += 1;
        sample(s.arcs[pk.link], pk.dir === 1 ? u : 1 - u, ac.pos, j);
        ac.size[j] = (k === 0 ? 44 : 24 * (1 - k / TRAIL)) * (1 + boost * 0.6);
        ac.alpha[j] = k === 0 ? 1 : 0.55 * (1 - k / TRAIL);
        ac.mix[j] = boost > 0.25 ? PINK : pk.dir === 1 ? CYAN : VIOLET;
      }
    });
    ac.flush();

    // --- Data centers: pulse rings, hover lift ---
    s.sites.forEach((site, i) => {
      const phase = (t * 0.6 + i * 0.37) % 1;
      site.ring.scale.setScalar(1 + phase * (2.6 + f.site[i] * 4));
      (site.ring.material as MeshBasicMaterial).opacity = animate ? 0.9 * (1 - phase) : 0.6;
      const target = (h.kind === "site" && h.index === i ? 1.5 : 1) * (1 + f.site[i] * 0.4);
      site.group.scale.setScalar(
        site.group.scale.x + (target - site.group.scale.x) * Math.min(1, delta * 10),
      );
    });

    // --- Relay satellites ---
    const next = new Vector3();
    for (const sat of s.satList) {
      const o = sat.orbit;
      const a = sat.phase + t * o.speed * (animate ? 1 : 0);
      sat.model.position.set(Math.cos(a) * o.r, 0, Math.sin(a) * o.r);
      if (sat.model.parent) {
        next.set(Math.cos(a + 0.05) * o.r, 0, Math.sin(a + 0.05) * o.r);
        sat.model.lookAt(sat.model.parent.localToWorld(next));
      }
      const target = (h.kind === "sat" && h.index === sat.index ? 1.6 : 1) * (1 + f.sat[sat.index] * 0.5);
      sat.model.scale.setScalar(sat.model.scale.x + (target - sat.model.scale.x) * Math.min(1, delta * 10));
      sat.beacon.visible = Math.sin(t * 5 + sat.index) > -0.3;
    }
    for (const o of s.orbits) {
      const lit = o.sats.some((st) => (h.kind === "sat" && h.index === st.index) || f.sat[st.index] > 0.2);
      o.lineMat.opacity += ((lit ? 1 : 0.5) - o.lineMat.opacity) * Math.min(1, delta * 6);
    }

    // --- Satellite train: evenly spaced, flat panels facing outward ---
    const dummy = new Object3D();
    const tg = s.trainGlints;
    for (let k = 0; k < TRAIN.count; k++) {
      const a = t * TRAIN.speed * (animate ? 1 : 0) - k * TRAIN.spacing;
      dummy.position.set(Math.cos(a) * TRAIN.r, 0, Math.sin(a) * TRAIN.r);
      dummy.lookAt(0, 0, 0);
      dummy.rotateX(Math.PI / 2);
      dummy.scale.set(0.034, 0.002, 0.014);
      dummy.updateMatrix();
      s.train.setMatrixAt(k, dummy.matrix);
      tg.pos.set([dummy.position.x, dummy.position.y, dummy.position.z], k * 3);
      tg.size[k] = 16;
      tg.alpha[k] = 0.55 + 0.45 * Math.sin(t * 2 + k * 0.8);
      tg.mix[k] = METAL;
    }
    s.train.instanceMatrix.needsUpdate = true;
    tg.flush();

    // --- Launch: only when the Cape faces the viewer, then a calm 16s cycle ---
    const L = launch.current;
    const padWorld = s.launchPad.getWorldPosition(new Vector3());
    const padFacing = padWorld.clone().normalize().dot(camera.position.clone().normalize());
    if (animate && t > L.next && t - L.start > LAUNCH.flight && padFacing > 0.25) {
      L.start = t;
      L.next = t + LAUNCH.every;
    }
    const u = (t - L.start) / LAUNCH.flight;
    const flying = u >= 0 && u <= 1;
    s.rocket.visible = flying;
    const ex = s.exhaust;
    if (flying) {
      const pos = rocketPoint(s.padUp, s.padEast, u, new Vector3());
      const ahead = rocketPoint(s.padUp, s.padEast, Math.min(1, u + 0.01), new Vector3());
      s.rocket.position.copy(pos);
      s.rocket.quaternion.setFromUnitVectors(Y_AXIS, ahead.sub(pos).normalize());
      s.rocket.scale.setScalar(u > 0.85 ? 1 - (u - 0.85) / 0.15 : 1);
    }
    for (let k = 0; k < LAUNCH.exhaust; k++) {
      const uk = u - 0.006 - k * 0.012;
      const on = flying && uk > 0;
      if (on) rocketPoint(s.padUp, s.padEast, uk, new Vector3()).toArray(ex.pos, k * 3);
      ex.size[k] = 30 * (1 - k / LAUNCH.exhaust) + 6;
      ex.alpha[k] = on ? 0.9 * (1 - k / LAUNCH.exhaust) * (u > 0.85 ? 1 - (u - 0.85) / 0.15 : 1) : 0;
      ex.mix[k] = k < 3 ? PINK : ORANGE;
    }
    ex.flush();

    // --- Uplinks: relay satellite <-> the data center most directly beneath it ---
    const center = new Vector3();
    const siteWorld = s.sites.map((site) => site.group.getWorldPosition(new Vector3()));
    const up = s.upAttr.array as Float32Array;
    const uc = s.upCloud;
    s.satList.forEach((sat, j) => {
      sat.model.updateMatrixWorld();
      const satPos = sat.model.getWorldPosition(new Vector3());
      const dir = satPos.clone().sub(center).normalize();
      let best = -1;
      let bestDot = 0.55;
      siteWorld.forEach((w, i) => {
        const d = w.clone().sub(center).normalize().dot(dir);
        if (d > bestDot) {
          bestDot = d;
          best = i;
        }
      });
      const from = best >= 0 ? siteWorld[best] : satPos;
      up.set([from.x, from.y, from.z, satPos.x, satPos.y, satPos.z], j * 6);
      for (let k = 0; k < 2; k++) {
        const pk = s.upPackets[j * 2 + k];
        pk.t = (pk.t + step * 0.5 * (1 + f.sat[j] * 3)) % 1;
        for (let q = 0; q < 4; q++) {
          const idx = (j * 2 + k) * 4 + q;
          const w = pk.dir === 1 ? Math.max(0, pk.t - q * 0.03) : 1 - Math.max(0, pk.t - q * 0.03);
          uc.pos[idx * 3] = from.x + (satPos.x - from.x) * w;
          uc.pos[idx * 3 + 1] = from.y + (satPos.y - from.y) * w;
          uc.pos[idx * 3 + 2] = from.z + (satPos.z - from.z) * w;
          uc.size[idx] = (q === 0 ? 34 : 20 * (1 - q / 4)) * (1 + f.sat[j] * 0.6);
          uc.alpha[idx] = best >= 0 ? (q === 0 ? 1 : 0.5 * (1 - q / 4)) : 0;
          uc.mix[idx] = pk.dir === 1 ? LIME : CYAN;
        }
      }
    });
    s.upAttr.needsUpdate = true;
    uc.flush();
    s.upMat.opacity = 0.35 + Math.max(...f.sat) * 0.5;

    // --- Click feedback ---
    for (const r of s.ripples) {
      const age = t - r.start;
      r.mesh.visible = age < 1.4;
      if (r.mesh.visible) {
        r.mesh.scale.setScalar(1 + age * 6);
        (r.mesh.material as MeshBasicMaterial).opacity = 1 - age / 1.4;
      }
    }
    const tAge = t - s.temp.start;
    s.temp.mat.opacity = tAge < 2.4 ? Math.min(1, tAge * 4) * Math.min(1, (2.4 - tAge) * 2) * 0.9 : 0;
    const tcl = s.temp.cloud;
    for (let k = 0; k < TRAIL; k++) {
      const uu = Math.min(1, tAge / 1.4) - k * 0.015;
      sample(s.temp.pts, Math.max(0, uu), tcl.pos, k);
      tcl.size[k] = k === 0 ? 48 : 26 * (1 - k / TRAIL);
      tcl.alpha[k] = tAge < 2.4 && uu > 0 ? (k === 0 ? 1 : 0.5 * (1 - k / TRAIL)) : 0;
      tcl.mix[k] = PINK;
    }
    tcl.flush();
    if (s.marker.visible) s.marker.scale.setScalar(1 + Math.sin(t * 4) * 0.12);
    const atm = s.atmosphere.material as ShaderMaterial;
    atm.uniforms.uIntensity.value +=
      ((h.kind ? 0.85 : 0.55) - atm.uniforms.uIntensity.value) * Math.min(1, delta * 4);

    // --- DOM overlays: always-on data center labels + the hover tooltip (no React renders) ---
    const camDir = camera.position.clone().normalize();
    const project = (v: Vector3) => {
      v.project(camera);
      return [(v.x * 0.5 + 0.5) * size.width, (-v.y * 0.5 + 0.5) * size.height];
    };
    const anchors = [...s.sites.map((site) => site.group), s.launchPad];
    anchors.forEach((anchor, i) => {
      const el = labelRefs.current[i];
      if (!el) return;
      const world = anchor.localToWorld(new Vector3(0, 0.14, 0));
      const facing = anchor.getWorldPosition(new Vector3()).normalize().dot(camDir);
      const [x, y] = project(world);
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
      el.style.opacity = String(Math.min(1, Math.max(0, (facing - 0.2) / 0.25)));
      el.dataset.active = String(h.kind === "site" && h.index === i);
    });

    const el = tipRef.current;
    if (!el) return;
    let text = "";
    const at = new Vector3();
    if (h.kind === "sat") {
      text = `Relay satellite ${h.index + 1}`;
      s.satList[h.index].model.getWorldPosition(at);
    } else if (h.kind === "globe" && s.marker.visible) {
      s.marker.getWorldPosition(at);
      const { lat, lon } = latLonOf(s.marker.position);
      text = `${Math.abs(lat).toFixed(1)}°${lat >= 0 ? "N" : "S"}  ${Math.abs(lon).toFixed(1)}°${lon >= 0 ? "E" : "W"}`;
    }
    if (!text) {
      el.style.opacity = "0";
      return;
    }
    const [x, y] = project(at);
    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -150%)`;
    el.style.opacity = "1";
    if (tipText.current !== text) {
      tipText.current = text;
      el.textContent = text;
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1.8} />
      <group ref={globe}>
        <primitive object={s.atmosphere} />
        <group ref={tilt} rotation={[TILT, 0, 0]}>
          <group ref={spin} rotation={[0, START_Y, 0]}>
            <primitive
              object={s.body}
              onPointerMove={onBodyMove}
              onPointerOut={onBodyOut}
              onClick={onBodyClick}
            />
            <primitive object={s.surface} />
            {s.sites.map((site, i) => (
              <primitive
                key={SITES[i].name}
                object={site.group}
                onPointerOver={(e: ThreeEvent<PointerEvent>) => {
                  e.stopPropagation();
                  setHover("site", i);
                }}
                onPointerMove={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()}
                onPointerOut={() => hover.current.kind === "site" && setHover(null)}
                onClick={(e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  if (isDrag(e)) return;
                  fx.current.site[i] = 1;
                  focusOn(SITES[i].lat, SITES[i].lon);
                }}
              />
            ))}
          </group>
        </group>
        <primitive object={s.trainGroup} />
        {s.orbits.map((o) => (
          <group key={o.r} rotation={o.rot}>
            <primitive object={o.line} />
            {o.sats.map((sat) => (
              <primitive
                key={sat.index}
                object={sat.model}
                onPointerOver={(e: ThreeEvent<PointerEvent>) => {
                  e.stopPropagation();
                  setHover("sat", sat.index);
                }}
                onPointerMove={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()}
                onPointerOut={() => hover.current.kind === "sat" && setHover(null)}
                onClick={(e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  if (!isDrag(e)) fx.current.sat[sat.index] = 1;
                }}
              />
            ))}
          </group>
        ))}
      </group>
      <primitive object={s.uplinks} />
      <primitive object={s.upCloud.points} />
    </>
  );
}

export default function HeroGlobe() {
  const wrap = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const invalidateRef = useRef<() => void>(() => {});
  const palette = usePalette();
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [small, setSmall] = useState(false);
  const ctrl = useRef<Controls>({
    rotY: START_Y,
    rotX: TILT,
    velY: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    idle: 99,
    focusY: null,
    focusX: null,
  });

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setSmall(window.matchMedia("(max-width: 767px)").matches);
    const el = wrap.current;
    if (!el) return;
    // Stop rendering entirely once the hero scrolls out of view.
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const setCursor = (c: string) => {
    if (wrap.current && !ctrl.current.dragging) wrap.current.style.cursor = c;
  };

  // Drag to rotate. Window listeners (not pointer capture) so 3D click events still fire.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const c = ctrl.current;
    c.dragging = true;
    c.lastX = e.clientX;
    c.lastY = e.clientY;
    c.velY = 0;
    c.focusY = null;
    c.focusX = null;
    if (wrap.current) wrap.current.style.cursor = "grabbing";
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - c.lastX;
      const dy = ev.clientY - c.lastY;
      c.lastX = ev.clientX;
      c.lastY = ev.clientY;
      c.rotY += dx * DRAG;
      c.rotX = Math.min(1.15, Math.max(-0.25, c.rotX + dy * DRAG * 0.7));
      c.velY = dx * DRAG;
      c.idle = 0;
      invalidateRef.current();
    };
    const up = () => {
      c.dragging = false;
      if (wrap.current) wrap.current.style.cursor = "grab";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  return (
    <div
      ref={wrap}
      onPointerDown={onPointerDown}
      className="relative size-full cursor-grab touch-pan-y select-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {palette ? (
        <Canvas
          dpr={[1, small ? 1.5 : 1.75]}
          camera={{ position: [0, 0.2, 3.9], fov: 42 }}
          flat
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          frameloop={!visible ? "never" : reduced ? "demand" : "always"}
          onCreated={({ camera, invalidate }) => {
            camera.lookAt(0, 0, 0);
            invalidateRef.current = invalidate;
          }}
        >
          <Network
            palette={palette}
            dots={small ? 9000 : 16000}
            animate={!reduced}
            ctrl={ctrl}
            tipRef={tipRef}
            labelRefs={labelRefs}
            setCursor={setCursor}
          />
        </Canvas>
      ) : null}
      {LABELS.map((l, i) => (
        <div
          key={l.name}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          data-active="false"
          className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-md border border-border bg-card/85 px-2 py-0.5 text-center leading-tight opacity-0 shadow-[var(--shadow-card)] backdrop-blur-sm transition-[border-color,box-shadow] duration-200 data-[active=true]:border-violet data-[active=true]:shadow-[0_0_24px_-6px_var(--violet)]"
        >
          <span
            className={`block text-[0.66rem] font-semibold ${"hq" in l && l.hq ? "text-lime" : "text-fg"}`}
          >
            {l.name}
          </span>
          <span className="block text-[0.6rem] text-fg-3">{l.place}</span>
        </div>
      ))}
      <div
        ref={tipRef}
        className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full border border-border bg-card/90 px-3 py-1 font-mono text-[0.72rem] font-medium text-fg opacity-0 shadow-[var(--shadow-card)] backdrop-blur-sm transition-opacity duration-150"
      />
      <p className="t-small pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card/85 px-3 py-1 text-fg-3 backdrop-blur-sm">
        <span className="[@media(hover:none)]:hidden">Drag to rotate · click a data center or satellite</span>
        <span className="hidden [@media(hover:none)]:inline">Swipe to rotate · tap to explore</span>
      </p>
    </div>
  );
}
