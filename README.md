# Offside

Site de démonstration pour **Offside**, Saint-Brice-sous-Forêt : burgers, grillades, tex-mex et cuisine tunisienne, 100 % halal.

Réalisé par Magar Développement. Version démo : la commande et le paiement sont simulés.

## Pages

- `/` : accueil (hero, stats, vestiaires, compo du jour, Mercato, étapes, avis, club Supporters, Le Stade, FAQ)
- `/menu` : les Titulaires, carte de commande (recherche, filtres, fiche produit, panier, checkout démo)

## Stack

- Next.js 15 (App Router), React 19, Tailwind CSS 4
- Carte de démo dans `src/data/menu.ts`, panier côté client (localStorage)

Cible (phases suivantes) : Payload CMS v3 multi-tenant, PostgreSQL, Stripe (encaissement par resto), Resend, Vercel.

## Commandes

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
