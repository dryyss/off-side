"use client";

import { useCart } from "./CartProvider";

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div
      key={toast.id}
      role="status"
      className="toast fixed bottom-24 left-1/2 z-[60] flex items-center gap-3 rounded-[var(--radius-btn)] bg-white px-5 py-3 font-semibold text-ink shadow-2xl md:bottom-8"
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-orange text-sm">⚽</span>
      Ajouté au panier · {toast.text}
    </div>
  );
}
