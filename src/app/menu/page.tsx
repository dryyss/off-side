import type { Metadata } from "next";
import MenuBoard from "@/components/MenuBoard";

export const metadata: Metadata = {
  title: "Menu Offside | La compo du jour",
  description: "Burgers, grillades, bowls, couscous et desserts : commande en ligne et récupère au comptoir.",
};

export default function MenuPage() {
  return (
    <>
      <section className="blades relative overflow-hidden border-b border-white/10 px-4 pb-8 pt-28 md:px-8 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-[0.25em] text-orange">Les titulaires</p>
          <h1 className="mt-2 font-display text-[18vw] leading-[0.85] md:text-9xl">La compo du jour</h1>
          <p className="mt-3 max-w-xl text-lg text-chalk/80">
            Choisis tes titulaires, valide ta commande et récupère-la au comptoir Retraits. Zéro attente, 100 % halal.
          </p>
        </div>
      </section>
      <MenuBoard />
    </>
  );
}
