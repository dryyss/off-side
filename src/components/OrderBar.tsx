"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { euro } from "@/data/menu";

export default function OrderBar() {
  const { count, total, setOpen, open } = useCart();
  const path = usePathname();
  if (open) return null;
  if (count === 0 && path === "/menu") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      {count > 0 ? (
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between rounded-[var(--radius-btn)] bg-orange px-5 py-4 font-bold uppercase tracking-wider text-ink shadow-2xl shadow-ink/60"
        >
          <span className="grid h-7 min-w-7 place-items-center rounded-full bg-ink px-2 text-sm text-orange">{count}</span>
          <span>Voir mon panier</span>
          <span>{euro(total)}</span>
        </button>
      ) : (
        <Link
          href="/menu"
          className="block w-full rounded-[var(--radius-btn)] bg-orange px-5 py-4 text-center font-bold uppercase tracking-wider text-ink shadow-2xl shadow-ink/60"
        >
          Lance ta commande ⚽
        </Link>
      )}
    </div>
  );
}
