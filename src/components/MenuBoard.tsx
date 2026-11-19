"use client";

import { useEffect, useMemo, useState } from "react";
import { categories, euro, products, tagLabels, type Product, type Tag } from "@/data/menu";
import ProductModal from "./ProductModal";
import ProductVisual from "./ProductVisual";

const filters: Tag[] = ["populaire", "epice", "nouveau", "vege"];

export default function MenuBoard() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Tag[]>([]);
  const [current, setCurrent] = useState(categories[0].id);
  const [open, setOpen] = useState<Product | null>(null);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!needle || (p.name + " " + p.desc).toLowerCase().includes(needle)) &&
        active.every((t) => p.tags.includes(t)),
    );
  }, [q, active]);

  const visibleCats = useMemo(() => categories.filter((c) => list.some((p) => p.category === c.id)), [list]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-140px 0px -65% 0px" },
    );
    visibleCats.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [visibleCats]);

  useEffect(() => {
    document.getElementById("chip-" + current)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [current]);

  return (
    <>
      <div className="glass sticky top-[84px] z-30 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center">
            <label className="relative md:w-72">
              <span className="sr-only">Rechercher un plat</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cherche ton titulaire…"
                className="w-full rounded-[var(--radius-btn)] border border-white/15 bg-pitch px-4 py-2.5 pl-10 focus:border-orange focus:outline-none"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-chalk/50" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {filters.map((t) => {
                const on = active.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => setActive((a) => (on ? a.filter((x) => x !== t) : [...a, t]))}
                    aria-pressed={on}
                    className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold ${on ? "border-orange bg-orange text-ink" : "border-white/20 text-chalk/80"}`}
                  >
                    {tagLabels[t]}
                  </button>
                );
              })}
            </div>
          </div>
          <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 no-scrollbar" aria-label="Catégories">
            {visibleCats.map((c) => (
              <a
                key={c.id}
                id={"chip-" + c.id}
                href={"#" + c.id}
                className={`shrink-0 rounded-[var(--radius-btn)] px-4 py-2 font-display text-xl tracking-wide transition ${current === c.id ? "bg-orange text-ink" : "bg-pitch text-chalk hover:bg-white/10"}`}
              >
                <span className="mr-1.5 opacity-60">{c.number}</span>
                {c.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        {visibleCats.length === 0 && (
          <p className="py-24 text-center font-display text-4xl text-white/40">Aucun titulaire ne correspond. Change de tactique.</p>
        )}
        {visibleCats.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-64 pt-12">
            <div className="mb-5 flex items-end gap-4">
              <span className="font-display text-7xl leading-none text-orange">{c.number}</span>
              <div>
                <h2 className="font-display text-5xl leading-none">{c.name}</h2>
                <p className="text-chalk/60">{c.tagline}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list
                .filter((p) => p.category === c.id)
                .map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setOpen(p)}
                    className="card group flex w-full gap-4 overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-pitch p-3 text-left"
                  >
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[18px]">
                      <ProductVisual product={p} sizes="112px" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col py-1">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-full bg-orange/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-orange">{tagLabels[t]}</span>
                        ))}
                      </div>
                      <h3 className="mt-1 font-display text-2xl leading-tight">{p.name}</h3>
                      <p className="line-clamp-2 text-sm text-chalk/60">{p.desc}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="font-bold">{euro(p.price)}</span>
                        <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-orange text-xl font-bold text-ink transition group-hover:bg-white" aria-hidden>
                          +
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </section>
        ))}
      </div>

      {open && <ProductModal product={open} onClose={() => setOpen(null)} />}
    </>
  );
}
