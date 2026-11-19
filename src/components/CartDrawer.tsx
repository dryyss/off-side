"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "./CartProvider";
import { euro } from "@/data/menu";

type Step = "cart" | "checkout" | "done";
const DELIVERY_FEE = 2.5;

function slots() {
  const out = ["Dès que possible (≈ 15 min)"];
  for (let h = 11; h <= 22; h++) for (const m of [0, 30]) out.push(`${String(h).padStart(2, "0")}h${m ? "30" : "00"}`);
  return out;
}

export default function CartDrawer() {
  const { items, total, open, setOpen, setQty, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [mode, setMode] = useState<"retrait" | "livraison">("retrait");
  const [orderNo, setOrderNo] = useState("");
  const slotList = useMemo(slots, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const close = () => {
    setOpen(false);
    if (step === "done") setStep("cart");
  };
  const grand = total + (mode === "livraison" ? DELIVERY_FEE : 0);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={close} className={`scrim absolute inset-0 bg-ink/70 ${open ? "open" : ""}`} />
      <aside
        role="dialog"
        aria-label="Ton panier"
        className={`drawer absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-pitch shadow-2xl ${open ? "open" : ""}`}
      >
        <div className="blades flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-display text-4xl leading-none">
            {step === "cart" ? "Ta compo" : step === "checkout" ? "Coup d'envoi" : "C'est but !"}
          </h2>
          <button onClick={close} className="grid h-10 w-10 place-items-center rounded-[var(--radius-btn)] border border-white/15 text-xl hover:border-orange" aria-label="Fermer">
            ×
          </button>
        </div>

        {step === "done" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-orange text-5xl">⚽</div>
            <p className="font-display text-5xl leading-none">Commande validée</p>
            <p className="text-chalk/80">
              Commande n° <strong className="text-white">{orderNo}</strong>.{" "}
              {mode === "retrait" ? "Elle t'attend au comptoir Retraits." : "Elle part en livraison dès qu'elle sort de cuisine."}
            </p>
            <p className="rounded-[var(--radius-btn)] border border-orange/40 bg-orange/10 px-4 py-3 text-sm text-chalk">
              Commande de démo : aucun paiement n&apos;a été prélevé. Le paiement Stripe est branché en phase 4.
            </p>
            <button onClick={close} className="btn mt-2 rounded-[var(--radius-btn)] bg-orange px-6 py-3 font-bold uppercase tracking-wider text-ink">
              Retour au terrain
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-display text-5xl text-white/30">Banc vide</p>
            <p className="text-chalk/70">Ajoute tes titulaires depuis le menu.</p>
            <a href="/menu" onClick={() => setOpen(false)} className="btn mt-2 rounded-[var(--radius-btn)] bg-orange px-6 py-3 font-bold uppercase tracking-wider text-ink">
              Voir les titulaires
            </a>
          </div>
        ) : step === "cart" ? (
          <>
            <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-5">
              {items.map((i) => (
                <li key={i.key} className="flex gap-3 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{i.name}</p>
                    {i.options.length > 0 && <p className="text-sm text-chalk/60">{i.options.join(" · ")}</p>}
                    <p className="mt-1 text-sm font-semibold text-orange">{euro(i.unitPrice * i.qty)}</p>
                  </div>
                  <div className="flex h-10 items-center rounded-[var(--radius-btn)] border border-white/15">
                    <button onClick={() => setQty(i.key, i.qty - 1)} className="h-full w-9 text-lg" aria-label={`Retirer un ${i.name}`}>−</button>
                    <span className="w-6 text-center font-bold">{i.qty}</span>
                    <button onClick={() => setQty(i.key, i.qty + 1)} className="h-full w-9 text-lg" aria-label={`Ajouter un ${i.name}`}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 p-5">
              <div className="mb-4 flex justify-between text-lg font-bold">
                <span>Sous-total</span>
                <span>{euro(total)}</span>
              </div>
              <button onClick={() => setStep("checkout")} className="w-full rounded-[var(--radius-btn)] bg-orange py-4 font-bold uppercase tracking-wider text-ink hover:bg-white">
                Valider ma compo
              </button>
            </div>
          </>
        ) : (
          <form
            className="flex flex-1 flex-col overflow-hidden"
            onSubmit={(e) => {
              e.preventDefault();
              setOrderNo("OFF-" + Math.floor(1000 + Math.random() * 9000));
              clear();
              setStep("done");
            }}
          >
            <div className="flex-1 space-y-6 overflow-y-auto p-5">
              <fieldset>
                <legend className="mb-2 text-sm font-bold uppercase tracking-wider text-chalk/60">Mode</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["retrait", "livraison"] as const).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMode(m)}
                      className={`rounded-[var(--radius-btn)] border-2 px-3 py-3 text-left ${mode === m ? "border-orange bg-orange/10" : "border-white/15"}`}
                    >
                      <span className="block font-bold">{m === "retrait" ? "Retrait comptoir" : "Livraison"}</span>
                      <span className="text-sm text-chalk/60">{m === "retrait" ? "Gratuit, zéro attente" : `+ ${euro(DELIVERY_FEE)}`}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
              {mode === "livraison" && (
                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-chalk/60">Adresse</span>
                  <input required placeholder="12 rue de la Gare, Saint-Brice" className="w-full rounded-[var(--radius-btn)] border border-white/15 bg-ink px-4 py-3 focus:border-orange focus:outline-none" />
                </label>
              )}
              <label className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-chalk/60">Créneau</span>
                <select className="w-full rounded-[var(--radius-btn)] border border-white/15 bg-ink px-4 py-3 focus:border-orange focus:outline-none">
                  {slotList.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-chalk/60">Prénom</span>
                  <input required className="w-full rounded-[var(--radius-btn)] border border-white/15 bg-ink px-4 py-3 focus:border-orange focus:outline-none" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-chalk/60">Téléphone</span>
                  <input required type="tel" className="w-full rounded-[var(--radius-btn)] border border-white/15 bg-ink px-4 py-3 focus:border-orange focus:outline-none" />
                </label>
              </div>
              <div className="rounded-[var(--radius-btn)] border border-white/10 bg-ink p-4 text-sm text-chalk/70">
                💳 Carte bancaire, Apple Pay ou Google Pay. Paiement sécurisé Stripe (simulé dans cette démo).
              </div>
            </div>
            <div className="border-t border-white/10 p-5">
              <div className="mb-1 flex justify-between text-chalk/70">
                <span>Sous-total</span>
                <span>{euro(total)}</span>
              </div>
              {mode === "livraison" && (
                <div className="mb-1 flex justify-between text-chalk/70">
                  <span>Livraison</span>
                  <span>{euro(DELIVERY_FEE)}</span>
                </div>
              )}
              <div className="mb-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{euro(grand)}</span>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep("cart")} className="rounded-[var(--radius-btn)] border border-white/15 px-4 font-bold">
                  ←
                </button>
                <button className="flex-1 rounded-[var(--radius-btn)] bg-orange py-4 font-bold uppercase tracking-wider text-ink hover:bg-white">
                  Payer {euro(grand)}
                </button>
              </div>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}
