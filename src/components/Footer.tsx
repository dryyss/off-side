import Link from "next/link";

export default function Footer() {
  return (
    <footer className="blades relative overflow-hidden border-t border-white/10 bg-ink pb-28 pt-16 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-2xl text-orange">Le terrain</p>
          <ul className="mt-3 space-y-2 text-chalk/75">
            <li><Link href="/menu" className="hover:text-white">Titulaires (menu)</Link></li>
            <li><Link href="/#mercato" className="hover:text-white">Mercato</Link></li>
            <li><Link href="/#vestiaires" className="hover:text-white">Vestiaires</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-2xl text-orange">Les tribunes</p>
          <ul className="mt-3 space-y-2 text-chalk/75">
            <li><a href="https://www.instagram.com/offside_stbrice/" target="_blank" rel="noreferrer" className="hover:text-white">Instagram @offside_stbrice</a></li>
            <li><Link href="/#supporters" className="hover:text-white">Supporters</Link></li>
            <li><a href="https://meat-temps.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white">Meat Temps, juste à côté</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-2xl text-orange">Le stade</p>
          <p className="mt-3 text-chalk/75">Saint-Brice-sous-Forêt (95350)<br />Adresse exacte [À CONFIRMER]</p>
        </div>
        <div>
          <p className="font-display text-2xl text-orange">Le règlement</p>
          <ul className="mt-3 space-y-2 text-chalk/75">
            <li>Mentions légales</li>
            <li>CGV</li>
            <li>Confidentialité</li>
          </ul>
        </div>
      </div>
      <p className="mt-14 select-none text-center font-display text-[27vw] leading-[0.8] tracking-tight text-white md:text-[23vw]" aria-hidden>
        OFF<span className="text-orange">SIDE</span>
      </p>
      <p className="mt-6 px-4 text-center text-xs text-chalk/50">© 2026 Offside · 100 % halal · Version de démonstration réalisée par Magar Développement</p>
    </footer>
  );
}
