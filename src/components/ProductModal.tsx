"use client";

import { useEffect, useState } from "react";
import { euro, tagLabels, type Product } from "@/data/menu";
import { useCart } from "./CartProvider";
import ProductVisual from "./ProductVisual";

export default function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useCart();
  const groups = product.options ?? [];
  const [qty, setQty] = useState(1);
  const [sel, setSel] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(groups.map((g) => [g.id, g.required && g.type === "single" ? [g.choices[0].label] : []])),
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const toggle = (gid: string, label: string, single: boolean) =>
    setSel((s) => {
      const cur = s[gid] ?? [];
      if (single) return { ...s, [gid]: [label] };
      return { ...s, [gid]: cur.includes(label) ? cur.filter((l) => l !== label) : [...cur, label] };
    });

  const extra = groups.reduce(
    (sum, g) => sum + g.choices.filter((c) => sel[g.id]?.includes(c.label)).reduce((n, c) => n + (c.price ?? 0), 0),
    0,
  );
  const unit = product.price + extra;
  const optionLabels = groups.flatMap((g) => sel[g.id] ?? []).filter((l) => l !== "Seul");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center" role="dialog" aria-modal aria-label={product.name}>
      <div className="absolute inset-0 bg-ink/75" onClick={onClose} />
      <div className="rise relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[var(--radius-card)] bg-pitch md:rounded-[var(--radius-card)]">
        <div className="relative aspect-[16/10] w-full shrink-0 md:aspect-[16/8]">
          <ProductVisual product={product} sizes="(min-width: 768px) 672px, 100vw" />
          <button onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink/70 text-2xl text-white" aria-label="Fermer">
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 md:p-7">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="rounded-full bg-orange/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange">{tagLabels[t]}</span>
            ))}
          </div>
          <h3 className="mt-2 font-display text-5xl leading-none">{product.name}</h3>
          <p className="mt-2 text-chalk/80">{product.desc}</p>
          <p className="mt-2 text-xl font-bold text-orange">{euro(product.price)}</p>

          {groups.map((g) => (
            <fieldset key={g.id} className="mt-6">
              <legend className="mb-2 flex w-full items-center justify-between text-sm font-bold uppercase tracking-wider">
                <span>{g.name}</span>
                <span className="text-xs font-semibold text-chalk/50">{g.required ? "Obligatoire" : "Au choix"}</span>
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {g.choices.map((c) => {
                  const on = sel[g.id]?.includes(c.label);
                  return (
                    <button
                      type="button"
                      key={c.label}
                      onClick={() => toggle(g.id, c.label, g.type === "single")}
                      aria-pressed={on}
                      className={`flex items-center justify-between rounded-[var(--radius-btn)] border-2 px-4 py-3 text-left transition ${on ? "border-orange bg-orange/10" : "border-white/10 hover:border-white/30"}`}
                    >
                      <span>{c.label}</span>
                      {c.price ? <span className="text-sm text-chalk/70">+{euro(c.price)}</span> : null}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
        <div className="flex items-center gap-3 border-t border-white/10 p-4" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <div className="flex h-14 items-center rounded-[var(--radius-btn)] border border-white/15">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-full w-11 text-xl" aria-label="Moins">−</button>
            <span className="w-7 text-center text-lg font-bold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="h-full w-11 text-xl" aria-label="Plus">+</button>
          </div>
          <button
            onClick={() => {
              add({ productId: product.id, name: product.name, unitPrice: unit, qty, options: optionLabels });
              onClose();
            }}
            className="flex h-14 flex-1 items-center justify-between rounded-[var(--radius-btn)] bg-orange px-5 font-bold uppercase tracking-wider text-ink hover:bg-white"
          >
            <span>Ajouter</span>
            <span>{euro(unit * qty)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
