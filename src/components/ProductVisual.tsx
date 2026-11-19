import Image from "next/image";
import { categories, type Product } from "@/data/menu";

export default function ProductVisual({ product, sizes }: { product: Product; sizes: string }) {
  if (product.image) return <Image src={product.image} alt={product.name} fill sizes={sizes} className="zoom object-cover" />;
  const num = categories.find((c) => c.id === product.category)?.number ?? 10;
  return (
    <div className="blades-strong absolute inset-0 grid place-items-center zoom bg-orange" aria-hidden>
      <span className="font-display text-[7rem] leading-none text-ink/80">{num}</span>
      <span className="absolute bottom-3 left-0 right-0 truncate px-3 text-center font-display text-xl tracking-wide text-ink/70">{product.name}</span>
    </div>
  );
}
