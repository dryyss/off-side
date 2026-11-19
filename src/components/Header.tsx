"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

export default function Header() {
  const { count, setOpen } = useCart();
  const [bump, setBump] = useState(0);
  const prev = useRef(count);

  useEffect(() => {
    if (count > prev.current) setBump((b) => b + 1);
    prev.current = count;
  }, [count]);

  return (
    <header className="fixed inset-x-3 top-3 z-40">
      <div className="nav-float mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 rounded-[var(--radius-card)] border border-white/10 px-4 shadow-2xl shadow-ink/40 md:px-6">
        <Link href="/" className="font-display text-4xl leading-none tracking-wide" aria-label="Offside, accueil">
          OFF<span className="text-orange">SIDE</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-wider text-chalk/80 md:flex">
          <Link href="/menu" className="hover:text-orange">Titulaires</Link>
          <Link href="/#mercato" className="hover:text-orange">Mercato</Link>
          <Link href="/#vestiaires" className="hover:text-orange">Vestiaires</Link>
          <Link href="/#supporters" className="hover:text-orange">Supporters</Link>
          <Link href="/#stade" className="hover:text-orange">Le Stade</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            key={bump}
            onClick={() => setOpen(true)}
            className={`btn relative grid h-11 w-11 place-items-center rounded-[var(--radius-btn)] border border-white/15 hover:border-orange ${bump ? "bump" : ""}`}
            aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-orange px-1 text-xs font-bold text-ink">{count}</span>
            )}
          </button>
          <Link href="/menu" className="btn hidden rounded-[var(--radius-btn)] bg-orange px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink hover:bg-white sm:inline-block">
            Commander
          </Link>
        </div>
      </div>
    </header>
  );
}
