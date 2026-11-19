"use client";

import { useEffect, useRef } from "react";

type Props = { children: React.ReactNode; delay?: 0 | 1 | 2 | 3; className?: string; as?: "div" | "li" | "section" };

export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`rv ${delay ? "d" + delay : ""} ${className}`}>
      {children}
    </Tag>
  );
}
