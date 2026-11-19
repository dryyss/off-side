"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroPhoto() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 24;
      ty = (e.clientY / window.innerHeight - 0.5) * 24;
    };
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-sm will-change-transform md:max-w-none">
      <div className="float relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] border-4 border-orange shadow-2xl shadow-orange/25">
        <Image src="/smash.jpg" alt="Smash burger et frites Offside" fill priority sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" />
      </div>
      <div className="absolute -bottom-5 -left-3 -rotate-6 rounded-[var(--radius-btn)] bg-white px-4 py-2 font-display text-3xl text-ink shadow-xl md:-left-8">
        N°9 · Le Smash
      </div>
    </div>
  );
}
