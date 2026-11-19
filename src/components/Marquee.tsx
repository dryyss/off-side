type Props = { items: string[]; tilt?: "left" | "right"; tone?: "orange" | "dark"; reverse?: boolean };

export default function Marquee({ items, tilt = "left", tone = "orange", reverse }: Props) {
  const row = [...items, ...items];
  const toneCls = tone === "orange" ? "bg-orange text-ink" : "bg-chalk text-ink";
  return (
    <div className={`relative z-10 -mx-4 overflow-hidden py-3 ${toneCls} ${tilt === "left" ? "-rotate-2" : "rotate-2"}`} aria-hidden>
      <div className={`marquee-track flex w-max whitespace-nowrap ${reverse ? "reverse" : ""}`}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={i} className="flex items-center font-display text-3xl leading-none tracking-wide md:text-4xl">
                <span className="px-5">{t}</span>
                <span>⚽</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
