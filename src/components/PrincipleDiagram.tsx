/**
 * The catalogue's working-principle slide: one roof section, uncoated on the
 * left and coated on the right, with the temperature at the surface and in the
 * room below each half.
 */

const HOT = "var(--color-data-hot)";
const COOL = "var(--color-data-cool)";

const W = 900;
const H = 420;

const M = 56; // side margin
const MID = W / 2;
const SLAB_L = M;
const SLAB_R = W - M;

const SKY_TOP = 40;
const COAT_Y = 176; // coating sits on top of the deck, right half only
const COAT_H = 12;
const DECK_Y = 188;
const DECK_H = 20;
const ROOM_Y = 292;
const ROOM_H = 74;

/** A sun ray angled down-right, ending just above `endY`. */
function Ray({ x, endY, color }: { x: number; endY: number; color: string }) {
  const x2 = x + 30;
  return (
    <g opacity="0.9">
      <line
        x1={x}
        y1={SKY_TOP}
        x2={x2}
        y2={endY - 12}
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d={`M${x2} ${endY - 5} l-5.6 -6.4 l7.4 -1.8 z`} fill={color} />
    </g>
  );
}

export default function PrincipleDiagram() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-bg">
      <figcaption className="border-b border-line px-7 py-7 sm:px-9">
        <h3 className="font-display text-[1.6rem] font-normal leading-tight text-ink">
          One roof, measured twice
        </h3>
        <p className="mt-2.5 max-w-2xl text-[13.5px] leading-[1.7] text-body">
          The left half is bare. The right half carries the ceramic composite. Same structure, same
          sun, same moment — the only difference is the coating.
        </p>
      </figcaption>

      <div className="overflow-x-auto px-4 py-8 sm:px-8">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[620px]"
          role="img"
          aria-label="Cross-section of a roof. The uncoated half reaches 70.7°C at the surface and 46.1°C in the room below. The coated half reaches 46.3°C at the surface and 30.8°C in the room below."
        >
          {/* ------------------------------------------------ headers */}
          <text
            x={SLAB_L}
            y={22}
            fontSize="12"
            fill={HOT}
            fontFamily="var(--font-mono)"
            letterSpacing="2.4"
          >
            UNCOATED
          </text>
          <text
            x={SLAB_R}
            y={22}
            fontSize="12"
            fill={COOL}
            textAnchor="end"
            fontFamily="var(--font-mono)"
            letterSpacing="2.4"
          >
            COATED
          </text>

          {/* ------------------------------------------------ incoming sun */}
          {[90, 170, 250].map((x) => (
            <Ray key={`h${x}`} x={x} endY={DECK_Y} color={HOT} />
          ))}
          {[520, 600, 680].map((x) => (
            <Ray key={`c${x}`} x={x} endY={COAT_Y} color={COOL} />
          ))}

          {/* reflected off the coating */}
          {[556, 636, 716].map((x) => (
            <g key={`r${x}`}>
              <line
                x1={x}
                y1={COAT_Y - 8}
                x2={x + 46}
                y2={SKY_TOP + 16}
                stroke={COOL}
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path d={`M${x + 46} ${SKY_TOP + 16} l-1.4 7 l6.8 -4 z`} fill={COOL} />
            </g>
          ))}

          {/* ------------------------------------------------ coating (right only) */}
          <rect x={MID} y={COAT_Y} width={SLAB_R - MID} height={COAT_H} rx="3" fill={COOL} />

          {/* ------------------------------------------------ deck */}
          <rect
            x={SLAB_L}
            y={DECK_Y}
            width={SLAB_R - SLAB_L}
            height={DECK_H}
            rx="3"
            fill="var(--color-muted)"
            opacity="0.42"
          />

          {/* ------------------------------------------------ cavity heat */}
          <rect x={SLAB_L} y={DECK_Y + DECK_H} width={MID - SLAB_L} height={ROOM_Y - DECK_Y - DECK_H} fill={HOT} opacity="0.16" />
          <rect x={MID} y={DECK_Y + DECK_H} width={SLAB_R - MID} height={ROOM_Y - DECK_Y - DECK_H} fill={COOL} opacity="0.06" />

          {[120, 210, 300].map((x) => (
            <g key={`dh${x}`} opacity="0.9">
              <line x1={x} y1={DECK_Y + DECK_H + 12} x2={x} y2={ROOM_Y - 22} stroke={HOT} strokeWidth="1.7" strokeLinecap="round" />
              <path d={`M${x} ${ROOM_Y - 12} l-4.6 -9 h9.2 z`} fill={HOT} />
            </g>
          ))}
          {[600, 690].map((x) => (
            <g key={`dc${x}`} opacity="0.45">
              <line
                x1={x}
                y1={DECK_Y + DECK_H + 16}
                x2={x}
                y2={ROOM_Y - 26}
                stroke={COOL}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="4 6"
              />
              <path d={`M${x} ${ROOM_Y - 16} l-4.2 -8 h8.4 z`} fill={COOL} />
            </g>
          ))}

          {/* ------------------------------------------------ room */}
          <rect
            x={SLAB_L}
            y={ROOM_Y}
            width={SLAB_R - SLAB_L}
            height={ROOM_H}
            rx="4"
            fill="var(--color-surface)"
            stroke="var(--color-line)"
            strokeWidth="1.2"
          />

          {/* ------------------------------------------------ divider */}
          <line
            x1={MID}
            y1={SKY_TOP - 12}
            x2={MID}
            y2={ROOM_Y + ROOM_H}
            stroke="var(--color-line)"
            strokeWidth="1.4"
            strokeDasharray="5 6"
          />

          {/* ------------------------------------------------ readings */}
          {/* surface */}
          <text x={SLAB_L} y={COAT_Y - 26} fontSize="26" fill={HOT} fontWeight="600" fontFamily="var(--font-mono)">
            70.7°C
          </text>
          <text x={SLAB_L} y={COAT_Y - 8} fontSize="10.5" fill="var(--color-muted)" fontFamily="var(--font-mono)" letterSpacing="1.6">
            ROOF SURFACE
          </text>

          <text x={SLAB_R} y={COAT_Y - 26} fontSize="26" fill={COOL} fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">
            46.3°C
          </text>
          <text x={SLAB_R} y={COAT_Y - 8} fontSize="10.5" fill="var(--color-muted)" textAnchor="end" fontFamily="var(--font-mono)" letterSpacing="1.6">
            ROOF SURFACE
          </text>

          {/* room */}
          <text x={SLAB_L + 20} y={ROOM_Y + 30} fontSize="10.5" fill="var(--color-muted)" fontFamily="var(--font-mono)" letterSpacing="1.6">
            ROOM BELOW
          </text>
          <text x={SLAB_L + 20} y={ROOM_Y + 58} fontSize="22" fill={HOT} fontWeight="600" fontFamily="var(--font-mono)">
            46.1°C
          </text>

          <text x={SLAB_R - 20} y={ROOM_Y + 30} fontSize="10.5" fill="var(--color-muted)" textAnchor="end" fontFamily="var(--font-mono)" letterSpacing="1.6">
            ROOM BELOW
          </text>
          <text x={SLAB_R - 20} y={ROOM_Y + 58} fontSize="22" fill={COOL} fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">
            30.8°C
          </text>

          {/* ------------------------------------------------ layer labels, set on the bars */}
          <text
            x={MID + 16}
            y={COAT_Y + COAT_H - 3}
            fontSize="9"
            fill="#ffffff"
            fontFamily="var(--font-mono)"
            letterSpacing="1.8"
          >
            COATING — REFLECTOR
          </text>
          <text
            x={SLAB_L + 16}
            y={DECK_Y + DECK_H - 6}
            fontSize="9"
            fill="var(--color-ink-strong)"
            opacity="0.55"
            fontFamily="var(--font-mono)"
            letterSpacing="1.8"
          >
            SUBSTRATE — ROOF DECK
          </text>
        </svg>
      </div>

      <div className="flex flex-col gap-2 border-t border-line px-7 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-faint sm:flex-row sm:items-center sm:justify-between sm:px-9">
        <span>Reflector · insulator · substrate</span>
        <span>−24.4°C at the roof · −15.3°C in the room</span>
      </div>
    </figure>
  );
}
