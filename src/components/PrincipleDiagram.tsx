/**
 * The catalogue's "working principle" slide, drawn rather than screenshotted:
 * an uncoated section beside a coated one, showing where the heat stops.
 */
export default function PrincipleDiagram() {
  return (
    <figure className="lux-card px-6 py-9 sm:px-10">
      <figcaption className="mb-8">
        <h3 className="text-[1.3rem] font-normal tracking-[-0.01em] text-ink">
          Where the heat stops
        </h3>
        <p className="mt-2 max-w-xl text-[13.5px] leading-[1.7] text-body">
          Uncoated, radiation is absorbed straight into the substrate and re-radiates into the room
          below. Coated, the ceramic composite reflects first and insulates what remains.
        </p>
      </figcaption>

      <svg
        viewBox="0 0 720 300"
        className="w-full"
        role="img"
        aria-label="Uncoated substrate absorbs heat into the room below; coated substrate reflects and insulates, leaving the room cooler."
      >
        <defs>
          <linearGradient id="hotFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-data-hot)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--color-data-hot)" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="coolFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-data-cool)" stopOpacity="0.26" />
            <stop offset="100%" stopColor="var(--color-data-cool)" stopOpacity="0.02" />
          </linearGradient>
          <marker id="ah" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0 0.5 L6 3 L0 5.5 z" fill="var(--color-data-hot)" />
          </marker>
          <marker id="ac" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0 0.5 L6 3 L0 5.5 z" fill="var(--color-data-cool)" />
          </marker>
        </defs>

        {[
          { x: 0, label: "Uncoated", tone: "hot", roof: "70.7°C", room: "46.1°C" },
          { x: 380, label: "Coated", tone: "cool", roof: "46.3°C", room: "30.8°C" },
        ].map((side) => {
          const c = side.tone === "hot" ? "var(--color-data-hot)" : "var(--color-data-cool)";
          const fill = side.tone === "hot" ? "url(#hotFill)" : "url(#coolFill)";
          return (
            <g key={side.label} transform={`translate(${side.x},0)`}>
              {/* incoming radiation */}
              {[40, 90, 140, 190, 240].map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1={14}
                  x2={x + 22}
                  y2={62}
                  stroke={c}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  markerEnd={side.tone === "hot" ? "url(#ah)" : "url(#ac)"}
                  opacity="0.75"
                />
              ))}

              {/* reflected rays — coated only */}
              {side.tone === "cool" &&
                [70, 140, 210].map((x) => (
                  <line
                    key={`r${x}`}
                    x1={x + 20}
                    y1={78}
                    x2={x + 44}
                    y2={26}
                    stroke={c}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    markerEnd="url(#ac)"
                    opacity="0.85"
                  />
                ))}

              {/* coating layer */}
              {side.tone === "cool" && (
                <>
                  <rect x="26" y="84" width="270" height="11" rx="3" fill={c} opacity="0.9" />
                  <text
                    x="302"
                    y="93"
                    fontSize="10"
                    fill="var(--color-muted)"
                    fontFamily="var(--font-mono)"
                  >
                    coating
                  </text>
                </>
              )}

              {/* substrate */}
              <rect
                x="26"
                y={side.tone === "cool" ? 97 : 84}
                width="270"
                height="16"
                rx="3"
                fill="var(--color-muted)"
                opacity="0.55"
              />
              <text
                x="302"
                y={side.tone === "cool" ? 109 : 96}
                fontSize="10"
                fill="var(--color-muted)"
                fontFamily="var(--font-mono)"
              >
                substrate
              </text>

              {/* heat passing into the room */}
              <rect
                x="26"
                y={side.tone === "cool" ? 113 : 100}
                width="270"
                height={side.tone === "cool" ? 92 : 105}
                fill={fill}
              />

              {/* room */}
              <rect
                x="26"
                y="205"
                width="270"
                height="52"
                rx="4"
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="1.2"
              />
              <text x="40" y="228" fontSize="11" fill="var(--color-body)">
                Room below
              </text>
              <text
                x="40"
                y="246"
                fontSize="14"
                fill={c}
                fontWeight="600"
                fontFamily="var(--font-mono)"
              >
                {side.room}
              </text>

              {/* labels */}
              <text
                x="26"
                y="284"
                fontSize="11"
                fill="var(--color-faint)"
                letterSpacing="2"
                fontFamily="var(--font-mono)"
              >
                {side.label.toUpperCase()}
              </text>
              <text
                x="296"
                y="284"
                fontSize="13"
                fill={c}
                textAnchor="end"
                fontWeight="600"
                fontFamily="var(--font-mono)"
              >
                roof {side.roof}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
