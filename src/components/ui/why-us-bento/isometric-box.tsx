import type { SVGProps } from "react";

// VengeanceUI isometric-box-01 (src/assets/svgs), recolored with theme tokens.
// The shadow gradients use violet so they read on both the light and dark card.
export function IsometricBox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 221 141" fill="none" aria-hidden="true" {...props}>
      <rect
        width="79.6405"
        height="119.248"
        transform="matrix(0.866025 -0.5 0.866025 0.5 48 80.8203)"
        fill="url(#wub-box-shadow-a)"
      />
      <path
        d="M81.9999 90.3112L134.5 60.0003L177.64 84.9074L125.14 115.218L81.9999 90.3112Z"
        fill="url(#wub-box-shadow-b)"
      />
      <path
        d="M62.5002 89L18.0001 63.5C16.4118 62.5924 14.2057 61.5304 12.3281 59.5255C10.4153 57.483 10 54.5514 10 51.7532L10.0001 45.5L72.5 78.5H80L143 45V55C143 58.2 139.333 61 137.5 62L91.0002 89C78.6002 94.6 66.8335 91.3333 62.5002 89Z"
        fill="url(#wub-box-side)"
        className="stroke-border-strong"
      />
      <path
        d="M16.0215 35.5337L61.5462 9.25C69.9163 4.41754 83.4869 4.41752 91.857 9.25L136.89 35.25C145.26 40.0825 145.26 47.9175 136.89 52.75L91.3657 79.0337C82.9956 83.8661 69.4249 83.8661 61.0548 79.0337L16.0215 53.0337C7.65142 48.2012 7.65155 40.3662 16.0215 35.5337Z"
        className="fill-card stroke-border-strong"
      />
      <text
        dy=".35em"
        fontSize="56"
        fontWeight="900"
        textAnchor="middle"
        transform="translate(76.5, 43.5) scale(1, 0.57735) rotate(-45)"
        className="fill-violet"
        style={{ letterSpacing: "-0.02em" }}
      >
        AI
      </text>
      <defs>
        <linearGradient
          id="wub-box-shadow-a"
          x1="39.82"
          y1="0"
          x2="39.82"
          y2="119.248"
          gradientUnits="userSpaceOnUse"
        >
          <stop style={{ stopColor: "var(--violet)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--violet)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient
          id="wub-box-shadow-b"
          x1="105.277"
          y1="71.5335"
          x2="126.847"
          y2="108.894"
          gradientUnits="userSpaceOnUse"
        >
          <stop style={{ stopColor: "var(--violet)", stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: "var(--violet)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id="wub-box-side" x1="10" y1="52.5" x2="143" y2="54.5" gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: "var(--card)" }} />
          <stop offset="1" style={{ stopColor: "var(--muted)" }} />
        </linearGradient>
      </defs>
    </svg>
  );
}
