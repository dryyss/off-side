import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import ClubForm from "@/components/ClubForm";
import Reveal from "@/components/Reveal";
import HeroPhoto from "@/components/HeroPhoto";
import { categories, euro, mercato } from "@/data/menu";

const band = ["Burgers", "Grillades", "Tex-Mex", "Cuisine tunisienne", "100 % halal", "Casual food"];

const steps = [
  { n: "1", title: "Choisis ton titulaire", text: "Sur le site, dans l'appli ou à la borne. Burger, grillade ou couscous : c'est toi le coach." },
  { n: "2", title: "Valide ta commande", text: "Tu paies en ligne en quelques secondes et tu choisis ton créneau." },
  { n: "3", title: "Passe au comptoir", text: "Ta commande t'attend au comptoir Retraits. Zéro attente, zéro prolongation." },
];

const reviews = [
  { name: "Client Google", text: "Le smash est une dinguerie, les frites maison aussi. On revient chaque semaine en famille." },
  { name: "Client Google", text: "Couscous royal généreux, service rapide, équipe au top. Et tout est halal, parfait." },
  { name: "Client Google", text: "Commande récupérée en deux minutes au comptoir. Grillades parfaitement cuites." },
];

const faq = [
  { q: "C'est halal ?", a: "Oui, toutes nos viandes sont 100 % halal." },
  { q: "Vous livrez où ?", a: "Saint-Brice-sous-Forêt et alentours [ZONE À CONFIRMER]. Frais et minimum de commande affichés au panier." },
  { q: "Je peux commander à l'avance ?", a: "Oui, choisis ton créneau au moment de payer." },
  { q: "Comment je paie ?", a: "Carte bancaire, Apple Pay ou Google Pay. Paiement sécurisé." },
  { q: "Et les allergènes ?", a: "Ils sont indiqués sur chaque fiche produit. Au moindre doute, appelle le resto." },
];

const hours = [
  ["Lundi – Jeudi", "11h30 – 23h00"],
  ["Vendredi", "11h30 – 00h00"],
  ["Samedi", "11h30 – 00h00"],
  ["Dimanche", "12h00 – 23h00"],
];

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-semibold uppercase tracking-[0.25em] text-orange">{children}</p>;
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="blades relative overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-4 pb-16 pt-28 md:grid-cols-[1.25fr_1fr] md:px-8">
          <div className="rise">
            <Kicker>Saint-Brice-sous-Forêt · 100 % halal</Kicker>
            <h1 className="mt-4 font-display text-[21vw] leading-[0.84] md:text-[9.5rem] lg:text-[11rem]">
              Toutes tes envies.
              <br />
              <span className="text-orange">Un seul terrain.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-chalk/85 md:text-xl">
              Smash burgers, grillades, tex-mex et cuisine tunisienne faite maison. Tout le monde trouve son titulaire.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn rounded-[var(--radius-btn)] bg-orange px-7 py-4 font-bold uppercase tracking-wider text-ink transition hover:bg-white">
                Lance ta commande
              </Link>
              <Link href="#mercato" className="btn rounded-[var(--radius-btn)] border-2 border-white/25 px-7 py-4 font-bold uppercase tracking-wider transition hover:border-orange">
                Le Mercato
              </Link>
            </div>
          </div>
          <HeroPhoto />
        </div>
      </section>

      <div className="py-6">
        <Marquee items={band} />
      </div>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { el: <Counter to={4.7} decimals={1} suffix="/5" />, label: "Note Google" },
            { el: <Counter to={1600} prefix="+" />, label: "Avis clients" },
            { el: <Counter to={13.3} decimals={1} suffix=" K" />, label: "Supporters Insta" },
            { el: <Counter to={100} suffix=" %" />, label: "Halal & fait maison" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={(i % 4) as 0 | 1 | 2 | 3} className="card rounded-[var(--radius-card)] border border-white/10 bg-pitch p-5 md:p-7">
              <p className="font-display text-5xl leading-none text-orange md:text-7xl">{s.el}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-chalk/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MANIFESTE / VESTIAIRES */}
      <section id="vestiaires" className="scroll-mt-24 bg-chalk text-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-orange">Les vestiaires</p>
            <Reveal>
            <h2 className="mt-3 font-display text-6xl leading-[0.88] md:text-8xl">
              Un smash qui claque. Des grillades qui fument. <span className="text-orange">Un couscous comme à la maison.</span>
            </h2>
            </Reveal>
            <p className="mt-6 max-w-lg text-lg text-ink/75">
              Une cuisine familiale, 100 % halal, préparée sur place par une équipe qui envoie. Ici, on ne joue pas la montre : on joue le goût.
            </p>
          </div>
          <Reveal className="card relative aspect-[4/5] -rotate-2 overflow-hidden rounded-[var(--radius-card)] shadow-2xl">
            <Image src="/grillade.jpg" alt="Entrecôte grillée, purée maison et sauces" fill sizes="(min-width: 768px) 45vw, 92vw" className="zoom object-cover" />
          </Reveal>
        </div>
      </section>

      {/* COMPO DU JOUR */}
      <section className="blades">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <Kicker>Les titulaires</Kicker>
          <Reveal>
          <h2 className="mt-3 font-display text-7xl leading-[0.85] md:text-[7.5rem]">La compo du jour</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {categories.slice(0, 6).map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) as 0 | 1 | 2}>
              <Link
                href={`/menu#${c.id}`}
                className="card group relative block h-full overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-pitch p-5 md:p-7"
              >
                <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[9rem] leading-none text-white/[0.06] transition group-hover:text-orange/20 md:text-[12rem]">
                  {c.number}
                </span>
                <span className="font-display text-3xl text-orange">n°{c.number}</span>
                <h3 className="mt-6 font-display text-3xl leading-none md:text-5xl">{c.name}</h3>
                <p className="mt-2 text-sm text-chalk/65 md:text-base">{c.tagline}</p>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MERCATO */}
      <section id="mercato" className="scroll-mt-24 overflow-hidden bg-orange text-ink">
        <div className="blades-strong">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-8 md:py-24">
            <div className="card relative order-2 aspect-[3/4] rotate-2 overflow-hidden rounded-[var(--radius-card)] border-4 border-ink shadow-2xl md:order-1">
              <Image src="/fish-and-chips.jpg" alt="Fish & Chips Offside" fill sizes="(min-width: 768px) 45vw, 92vw" className="zoom object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <span className="inline-block -rotate-2 rounded-[var(--radius-btn)] bg-ink px-4 py-2 font-display text-2xl tracking-wide text-orange">Mercato · Transfert de la saison</span>
              <Reveal>
              <h2 className="mt-5 font-display text-8xl leading-[0.85] md:text-[8rem]">Fish &amp; Chips</h2>
              </Reveal>
              <p className="mt-5 max-w-md text-lg font-medium">
                Signé chez nous. Poisson pané croustillant, frites maison, sauce tartare. Le transfert de la saison.
              </p>
              <div className="mt-8 flex items-center gap-5">
                <span className="font-display text-6xl">{euro(mercato.price)}</span>
                <Link href="/menu#grillades" className="btn rounded-[var(--radius-btn)] bg-ink px-7 py-4 font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-ink">
                  Je le recrute
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 PASSES */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Kicker>Coup d&apos;envoi</Kicker>
        <Reveal>
        <h2 className="mt-3 font-display text-7xl leading-[0.85] md:text-[7.5rem]">3 passes et c&apos;est but</h2>
        </Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i as 0 | 1 | 2} className="card relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-pitch p-7">
              <span className="grid h-14 w-14 place-items-center rounded-[var(--radius-btn)] bg-orange font-display text-4xl text-ink">{s.n}</span>
              <h3 className="mt-6 font-display text-4xl leading-none">{s.title}</h3>
              <p className="mt-3 text-chalk/70">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <div className="pb-6">
        <Marquee items={["Smash", "Couscous", "Entrecôte", "Tacos XL", "Brick à l'œuf", "Tiramisu Lotus"]} tilt="right" tone="dark" reverse />
      </div>

      {/* AVIS */}
      <section id="supporters" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Kicker>Les supporters</Kicker>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <Reveal>
          <h2 className="font-display text-7xl leading-[0.85] md:text-[7.5rem]">Partout on en parle</h2>
          </Reveal>
          <p className="rounded-full border border-white/15 px-4 py-2 text-sm text-chalk/70">★ 4,7/5 · +1 600 avis Google</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i as 0 | 1 | 2} className="card flex flex-col rounded-[var(--radius-card)] border border-white/10 bg-pitch p-7">
            <figure className="flex flex-1 flex-col">
              <p className="text-xl tracking-widest text-orange" aria-label="5 étoiles">★★★★★</p>
              <blockquote className="mt-4 flex-1 text-lg text-chalk/90">« {r.text} »</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-chalk/50">{r.name} · avis d&apos;exemple</figcaption>
            </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-sm text-chalk/40">Avis d&apos;exemple pour la démo. Les vrais avis Google seront affichés sur le site final.</p>
      </section>

      {/* JUSTE À CÔTÉ */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <a
          href="https://meat-temps.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="card blades group relative block overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-pitch p-8 md:p-12"
        >
          <p className="font-semibold uppercase tracking-[0.25em] text-orange">Juste à côté</p>
          <Reveal>
          <h2 className="mt-3 font-display text-6xl leading-[0.88] md:text-8xl">Envie d&apos;Italie ?<br />Passe chez Meat Temps.</h2>
          </Reveal>
          <p className="mt-4 max-w-lg text-lg text-chalk/80">Pizza napolitaine au four à bois, panuozzi, pasta et tiramisu maison. Même famille, autre terrain.</p>
          <span className="mt-8 btn inline-block rounded-[var(--radius-btn)] bg-orange text-ink px-7 py-4 font-bold uppercase tracking-wider transition group-hover:bg-white">
            Découvrir Meat Temps →
          </span>
        </a>
      </section>

      {/* CLUB */}
      <section className="bg-orange text-ink">
        <div className="blades-strong">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-8 md:py-20">
            <div>
              <Reveal>
              <h2 className="font-display text-7xl leading-[0.85] md:text-8xl">Rejoins les Supporters</h2>
              </Reveal>
              <p className="mt-4 max-w-md text-lg font-medium">
                Les nouvelles recrues avant tout le monde, les offres de l&apos;appli et les soirs de match. Pas de spam, que du lourd.
              </p>
            </div>
            <ClubForm />
          </div>
        </div>
      </section>

      {/* LE STADE */}
      <section id="stade" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Kicker>Infos pratiques</Kicker>
        <Reveal>
        <h2 className="mt-3 font-display text-7xl leading-[0.85] md:text-[7.5rem]">Le Stade</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="card rounded-[var(--radius-card)] border border-white/10 bg-pitch p-7">
            <h3 className="font-display text-3xl text-orange">Adresse</h3>
            <p className="mt-3 text-lg">Saint-Brice-sous-Forêt (95350)</p>
            <p className="text-chalk/60">Adresse exacte [À CONFIRMER]</p>
            <p className="mt-4 text-chalk/80">Bornes de commande sur place et comptoir Retraits.</p>
          </div>
          <div className="card rounded-[var(--radius-card)] border border-white/10 bg-pitch p-7">
            <h3 className="font-display text-3xl text-orange">Horaires</h3>
            <dl className="mt-3 space-y-2">
              {hours.map(([d, h]) => (
                <div key={d} className="flex justify-between gap-4 border-b border-white/5 pb-2">
                  <dt className="text-chalk/70">{d}</dt>
                  <dd className="font-semibold">{h}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-chalk/40">Horaires indicatifs [À CONFIRMER]</p>
          </div>
          <div className="card rounded-[var(--radius-card)] border border-white/10 bg-pitch p-7">
            <h3 className="font-display text-3xl text-orange">Contact</h3>
            <p className="mt-3 text-lg">Téléphone [À CONFIRMER]</p>
            <a href="https://www.instagram.com/offside_stbrice/" target="_blank" rel="noreferrer" className="mt-2 inline-block text-lg underline decoration-orange underline-offset-4">
              @offside_stbrice
            </a>
            <p className="mt-4 text-chalk/80">Retrait express, livraison et sur place. Commande aussi dispo dans l&apos;appli.</p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-5xl">Les questions du vestiaire</h3>
          <div className="mt-6 divide-y divide-white/10 rounded-[var(--radius-card)] border border-white/10 bg-pitch">
            {faq.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {f.q}
                  <span className="text-2xl text-orange transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-chalk/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
