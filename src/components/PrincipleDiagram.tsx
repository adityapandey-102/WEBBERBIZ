/**
 * The catalogue's working-principle slide, drawn as a measured cross-section:
 * the same roof, uncoated and coated, with the temperature at each depth.
 */

type Side = {
  label: string;
  hot: boolean;
  roof: string;
  ceiling: string;
  note: string;
};

const SIDES: Side[] = [
  {
    label: "Uncoated",
    hot: true,
    roof: "70.7°C",
    ceiling: "46.1°C",
    note: "Radiation is absorbed into the metal and re-radiates into the room below.",
  },
  {
    label: "Coated",
    hot: false,
    roof: "46.3°C",
    ceiling: "30.8°C",
    note: "The ceramic composite reflects first, then insulates what remains.",
  },
];

const W = 400;
const H = 232;

const SLAB_X = 20;
const SLAB_W = 244;
const LABEL_X = SLAB_X + SLAB_W + 14; // leaders sit clear of the slabs

function Panel({ side }: { side: Side }) {
  const c = side.hot ? "var(--color-data-hot)" : "var(--color-data-cool)";
  const coatY = 96;
  const roofY = side.hot ? 96 : 108;
  const roofH = 13;
  const cavityY = roofY + roofH;
  const cavityH = 60;
  const ceilY = cavityY + cavityH;
  const roomY = ceilY + 9;

  const Leader = ({ y, text }: { y: number; text: string }) => (
    <>
      <line x1={SLAB_X + SLAB_W + 2} y1={y} x2={LABEL_X - 4} y2={y} stroke="var(--color-line)" strokeWidth="1" />
      <text x={LABEL_X} y={y + 3.5} fontSize="9.5" fill="var(--color-muted)" fontFamily="var(--font-mono)">
        {text}
      </text>
    </>
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={`${side.label}: roof ${side.roof}, room below ${side.ceiling}. ${side.note}`}
    >
      {/* incoming radiation — always from the upper left */}
      {[52, 104, 156, 208].map((x) => (
        <g key={`in${x}`} opacity="0.85">
          <line x1={x - 26} y1={14} x2={x - 2} y2={coatY - 14} stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          <path d={`M${x - 2} ${coatY - 8} l-4.6 -5.6 l6.4 -1.4 z`} fill={c} />
        </g>
      ))}

      {/* reflected radiation — coated only, bouncing up to the right */}
      {!side.hot &&
        [96, 158, 220].map((x) => (
          <g key={`ref${x}`}>
            <line x1={x} y1={coatY - 6} x2={x + 40} y2={20} stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0" />
            <path d={`M${x + 40} 20 l-1 6 l5.8 -3.4 z`} fill={c} />
          </g>
        ))}

      {/* coating */}
      {!side.hot && (
        <>
          <rect x={SLAB_X} y={coatY} width={SLAB_W} height="9" rx="2" fill={c} />
          <Leader y={coatY + 4.5} text="coating" />
        </>
      )}

      {/* substrate */}
      <rect x={SLAB_X} y={roofY} width={SLAB_W} height={roofH} rx="2" fill="var(--color-muted)" opacity="0.45" />
      <Leader y={roofY + roofH / 2} text="roof" />

      {/* cavity — heat travelling down */}
      <rect x={SLAB_X} y={cavityY} width={SLAB_W} height={cavityH} fill={c} opacity={side.hot ? 0.15 : 0.06} />
      {[70, 142, 214].map((x) => (
        <g key={`d${x}`} opacity={side.hot ? 0.9 : 0.42}>
          <line
            x1={x}
            y1={cavityY + 10}
            x2={x}
            y2={cavityY + cavityH - 16}
            stroke={c}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray={side.hot ? "0" : "3 5"}
          />
          <path d={`M${x} ${cavityY + cavityH - 8} l-3.6 -7 h7.2 z`} fill={c} />
        </g>
      ))}

      {/* ceiling slab */}
      <rect x={SLAB_X} y={ceilY} width={SLAB_W} height="9" rx="2" fill="var(--color-line)" />
      <Leader y={ceilY + 4.5} text="ceiling" />

      {/* room */}
      <rect
        x={SLAB_X}
        y={roomY}
        width={SLAB_W}
        height="36"
        rx="3"
        fill="var(--color-surface)"
        stroke="var(--color-line)"
        strokeWidth="1"
      />
      <text
        x={SLAB_X + 16}
        y={roomY + 22}
        fontSize="9.5"
        fill="var(--color-muted)"
        fontFamily="var(--font-mono)"
        letterSpacing="1.5"
      >
        ROOM BELOW
      </text>
    </svg>
  );
}

export default function PrincipleDiagram() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-bg">
      <figcaption className="border-b border-line px-7 py-7 sm:px-9">
        <h3 className="font-display text-[1.6rem] font-normal leading-tight text-ink">
          Where the heat stops
        </h3>
        <p className="mt-2.5 max-w-xl text-[13.5px] leading-[1.7] text-body">
          The same roof section, measured twice. Uncoated, radiation is absorbed and passes through.
          Coated, it is reflected at the surface and what remains is held out of the room.
        </p>
      </figcaption>

      <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {SIDES.map((side) => (
          <div key={side.label} className="px-7 py-8 sm:px-8">
            <div className="flex items-baseline justify-between">
              <span
                className="text-[10.5px] font-medium uppercase tracking-[0.2em]"
                style={{ color: side.hot ? "var(--color-data-hot)" : "var(--color-data-cool)" }}
              >
                {side.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                10-ft container
              </span>
            </div>

            {/* Readings live in HTML so they can never collide with the drawing */}
            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-4">
              {[
                { k: "Roof surface", v: side.roof },
                { k: "Room below", v: side.ceiling },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
                    {row.k}
                  </dt>
                  <dd
                    className="mt-1.5 font-display text-[1.9rem] leading-none"
                    style={{
                      color: side.hot ? "var(--color-data-hot)" : "var(--color-data-cool)",
                    }}
                  >
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <Panel side={side} />
            </div>

            <p className="mt-5 text-[13px] leading-[1.7] text-body">{side.note}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-line px-7 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-faint sm:flex-row sm:items-center sm:justify-between sm:px-9">
        <span>Reflector · insulator · substrate</span>
        <span>−24.4°C at the roof · −15.3°C at the ceiling</span>
      </div>
    </figure>
  );
}
