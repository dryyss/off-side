"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type CartItem = { key: string; productId: string; name: string; unitPrice: number; qty: number; options: string[] };

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "key">) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  toast: { id: number; text: string } | null;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "offside-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const value = useMemo<CartCtx>(() => {
    const add: CartCtx["add"] = (item) => {
      const key = item.productId + "|" + item.options.join(",");
      setItems((prev) => {
        const found = prev.find((i) => i.key === key);
        if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty } : i));
        return [...prev, { ...item, key }];
      });
      clearTimeout(timer.current);
      setToast({ id: Date.now(), text: item.name });
      timer.current = setTimeout(() => setToast(null), 2200);
    };
    const setQty: CartCtx["setQty"] = (key, qty) =>
      setItems((prev) => (qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))));
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.unitPrice, 0),
      open,
      setOpen,
      add,
      setQty,
      clear: () => setItems([]),
      toast,
    };
  }, [items, open, toast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart hors CartProvider");
  return c;
}
