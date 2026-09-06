interface WorldMapProps {
  className?: string
}

export function WorldMap({ className }: WorldMapProps) {
  const fill = "#C8D9BF"
  const stroke = "#A4BF9A"
  const sw = "1.2"
  const pinColor = "#D94F4F"

  // Pin head center positions in the 960×500 viewBox
  // formula: x = (lon + 180) / 360 * 960 ; y = (90 - lat) / 180 * 500
  const pins = [
    { name: "Japan",       cx: 853, cy: 150 },
    { name: "Australia",   cx: 837, cy: 319 },
    { name: "UK",          cx: 480, cy: 108 },
    { name: "Italy",       cx: 512, cy: 133 },
    { name: "US",          cx: 224, cy: 142 },
    { name: "Cambodia",    cx: 760, cy: 217 },
    { name: "Philippines", cx: 803, cy: 211 },
  ]

  return (
    <svg
      viewBox="0 0 960 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="World map showing visited countries"
      role="img"
    >
      {/* Ocean background */}
      <rect width="960" height="500" fill="#E6F0EA" rx="14" />

      {/* Subtle graticule grid */}
      {[1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6].map((t, i) => (
        <line key={`lat-${i}`} x1="0" y1={t * 500} x2="960" y2={t * 500} stroke="#D0E8D8" strokeWidth="0.7" />
      ))}
      {[1 / 8, 2 / 8, 3 / 8, 4 / 8, 5 / 8, 6 / 8, 7 / 8].map((t, i) => (
        <line key={`lon-${i}`} x1={t * 960} y1="0" x2={t * 960} y2="500" stroke="#D0E8D8" strokeWidth="0.7" />
      ))}

      {/* ── Continents ── */}

      {/* Greenland */}
      <polygon points="349,17 443,17 443,56 410,78 349,61" fill={fill} stroke={stroke} strokeWidth={sw} />

      {/* North America */}
      <polygon
        points="20,67 107,56 188,61 240,47 307,61 349,119 340,144 283,181 249,208 200,189 164,161 133,97"
        fill={fill} stroke={stroke} strokeWidth={sw}
      />

      {/* Cuba */}
      <ellipse cx="277" cy="194" rx="18" ry="6" fill={fill} stroke={stroke} strokeWidth="0.8" />

      {/* South America */}
      <polygon
        points="269,219 315,217 347,250 389,264 381,403 298,403 267,356"
        fill={fill} stroke={stroke} strokeWidth={sw}
      />

      {/* Europe */}
      <polygon
        points="453,83 560,50 587,83 573,144 554,133 520,122 507,97 480,106 467,128"
        fill={fill} stroke={stroke} strokeWidth={sw}
      />

      {/* Africa */}
      <polygon
        points="450,144 587,144 619,208 613,258 592,283 573,353 527,347 450,344 450,211"
        fill={fill} stroke={stroke} strokeWidth={sw}
      />

      {/* Asia (incl. Arabian Peninsula, Indian subcontinent outline) */}
      <polygon
        points="547,47 667,33 776,50 872,56 872,133 844,144 831,172 770,217 748,236 688,222 635,194 620,208 608,180 570,164 553,125"
        fill={fill} stroke={stroke} strokeWidth={sw}
      />

      {/* Japan — simplified elongated island */}
      <ellipse
        cx="853" cy="153" rx="11" ry="26"
        fill={fill} stroke={stroke} strokeWidth="0.9"
        transform="rotate(-22,853,153)"
      />

      {/* Sri Lanka */}
      <circle cx="707" cy="248" r="4" fill={fill} stroke={stroke} strokeWidth="0.8" />

      {/* Australia */}
      <polygon
        points="784,289 845,283 888,300 896,328 882,356 846,361 787,347 784,328"
        fill={fill} stroke={stroke} strokeWidth={sw}
      />

      {/* New Zealand */}
      <ellipse
        cx="924" cy="355" rx="5" ry="13"
        fill={fill} stroke={stroke} strokeWidth="0.8"
        transform="rotate(15,924,355)"
      />

      {/* ── Location Pins ── */}
      {pins.map(({ name, cx, cy }) => {
        const tipY = cy + 14
        return (
          <g key={name}>
            {/* drop shadow */}
            <ellipse cx={cx} cy={tipY + 3} rx={5} ry={2.5} fill="rgba(0,0,0,0.12)" />
            {/* teardrop body: tip → left edge → arc over top → right edge → back to tip */}
            <path
              d={`M${cx},${tipY} C${cx - 4},${tipY - 7} ${cx - 9},${tipY - 11} ${cx - 9},${cy} A9,9 0 0,1 ${cx + 9},${cy} C${cx + 9},${tipY - 11} ${cx + 4},${tipY - 7} ${cx},${tipY}Z`}
              fill={pinColor}
            />
            {/* white inner highlight dot */}
            <circle cx={cx} cy={cy} r={3.5} fill="rgba(255,255,255,0.65)" />
          </g>
        )
      })}
    </svg>
  )
}
