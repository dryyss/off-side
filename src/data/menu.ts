export type Tag = "populaire" | "epice" | "nouveau" | "vege";

export type Choice = { label: string; price?: number };
export type OptionGroup = { id: string; name: string; type: "single" | "multi"; required?: boolean; choices: Choice[] };

export type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: string;
  tags: Tag[];
  image?: string;
  options?: OptionGroup[];
};

export type Category = { id: string; name: string; number: number; tagline: string };

export const categories: Category[] = [
  { id: "burgers", name: "Burgers", number: 9, tagline: "Le buteur. Smashé, fondant, décisif." },
  { id: "grillades", name: "Grillades", number: 10, tagline: "Le meneur de jeu. Ça fume, ça claque." },
  { id: "bowls", name: "Bowls & Tex-Mex", number: 7, tagline: "L'ailier qui déborde de saveurs." },
  { id: "tunisienne", name: "Cuisine tunisienne", number: 11, tagline: "Le cœur du club. Comme à la maison." },
  { id: "rolls", name: "Rolls & Salades", number: 8, tagline: "Le box-to-box. Léger, mais il court." },
  { id: "desserts", name: "Desserts", number: 1, tagline: "Le dernier rempart avant la fin du match." },
  { id: "boissons", name: "Boissons", number: 12, tagline: "Le 12e homme. Toujours là." },
];

export const tagLabels: Record<Tag, string> = {
  populaire: "Populaire",
  epice: "Épicé",
  nouveau: "Nouveau",
  vege: "Végé",
};

const sauces: OptionGroup = {
  id: "sauce",
  name: "Ta sauce",
  type: "single",
  required: true,
  choices: [{ label: "Maison Offside" }, { label: "Algérienne" }, { label: "Samouraï" }, { label: "Barbecue" }, { label: "Harissa maison" }, { label: "Sans sauce" }],
};

const cuisson: OptionGroup = {
  id: "cuisson",
  name: "Cuisson",
  type: "single",
  required: true,
  choices: [{ label: "Saignant" }, { label: "À point" }, { label: "Bien cuit" }],
};

const supplements: OptionGroup = {
  id: "supp",
  name: "Suppléments",
  type: "multi",
  choices: [
    { label: "Cheddar", price: 1 },
    { label: "Bacon de bœuf", price: 1.5 },
    { label: "Oignons confits", price: 1 },
    { label: "Œuf", price: 1 },
    { label: "Steak en plus", price: 3.5 },
  ],
};

const formule: OptionGroup = {
  id: "menu",
  name: "Passe en menu",
  type: "single",
  required: true,
  choices: [{ label: "Seul" }, { label: "Menu frites + boisson", price: 3.5 }, { label: "Menu patates douces + boisson", price: 4.5 }],
};

const burgerOpts = [formule, sauces, supplements];
const grillOpts = [cuisson, sauces, { ...supplements, choices: supplements.choices.slice(2, 4) }];

export const products: Product[] = [
  // Burgers
  { id: "smash-classic", name: "Le Smash", desc: "Double steak smashé, cheddar fondu, pickles, oignons, sauce maison dans un bun brioché.", price: 11.9, category: "burgers", tags: ["populaire"], image: "/smash.jpg", options: burgerOpts },
  { id: "smash-triple", name: "Triple Smash", desc: "Trois steaks smashés, triple cheddar, bacon de bœuf croustillant. Pour les grosses faims.", price: 14.9, category: "burgers", tags: ["populaire"], options: burgerOpts },
  { id: "burger-hot", name: "Le Hors-Jeu", desc: "Steak smashé, jalapeños, pepper jack, sauce samouraï et oignons frits. Ça pique, et c'est voulu.", price: 12.9, category: "burgers", tags: ["epice"], options: burgerOpts },
  { id: "burger-chicken", name: "Crispy Chicken", desc: "Filet de poulet pané minute, salade, tomate, cheddar et mayo citronnée.", price: 11.5, category: "burgers", tags: [], options: burgerOpts },
  { id: "burger-truffe", name: "Le Ballon d'Or", desc: "Steak smashé, crème de truffe, emmental fumé, roquette et oignons confits.", price: 15.9, category: "burgers", tags: ["nouveau"], options: burgerOpts },

  // Grillades
  { id: "fish-chips", name: "Fish & Chips", desc: "Poisson pané croustillant, frites maison, sauce tartare. Le transfert de la saison.", price: 13.9, category: "grillades", tags: ["nouveau", "populaire"], image: "/fish-and-chips.jpg", options: [{ id: "sauce", name: "Ta sauce", type: "single", required: true, choices: [{ label: "Tartare maison" }, { label: "Mayo citronnée" }, { label: "Ketchup" }] }] },
  { id: "entrecote", name: "Entrecôte grillée", desc: "Entrecôte de 300 g grillée, purée maison, sauce chimichurri et sauce poivre.", price: 22.9, category: "grillades", tags: ["populaire"], image: "/grillade.jpg", options: grillOpts },
  { id: "brochettes", name: "Brochettes mixtes", desc: "Bœuf, poulet mariné et merguez, frites maison ou riz, salade fraîche.", price: 17.9, category: "grillades", tags: [], options: [sauces] },
  { id: "cotes-agneau", name: "Côtelettes d'agneau", desc: "Quatre côtelettes grillées au thym, légumes rôtis et harissa douce.", price: 21.9, category: "grillades", tags: [], options: [cuisson] },
  { id: "poulet-grille", name: "Demi-poulet grillé", desc: "Mariné 24 h au citron et épices, cuit à la braise, frites maison.", price: 15.9, category: "grillades", tags: [], options: [sauces] },

  // Bowls & Tex-Mex
  { id: "bowl-chicken", name: "Bowl Poulet Crispy", desc: "Riz, poulet croustillant, maïs, avocat, cheddar, sauce maison.", price: 12.9, category: "bowls", tags: ["populaire"] },
  { id: "tacos-xl", name: "Tacos XL", desc: "Deux viandes au choix, sauce fromagère maison, frites dedans. Le classique du vendredi.", price: 11.9, category: "bowls", tags: [], options: [sauces, supplements] },
  { id: "quesadilla", name: "Quesadilla Bœuf", desc: "Bœuf haché épicé, poivrons, cheddar et mozzarella gratinés, crème aigre.", price: 10.9, category: "bowls", tags: ["epice"] },
  { id: "nachos", name: "Nachos du Stade", desc: "Nachos, cheddar fondu, guacamole, jalapeños, pico de gallo. À partager.", price: 8.9, category: "bowls", tags: ["vege"] },

  // Tunisienne
  { id: "couscous", name: "Couscous royal", desc: "Semoule fine, légumes mijotés, agneau, poulet et merguez. Le dimanche, tous les jours.", price: 18.9, category: "tunisienne", tags: ["populaire"] },
  { id: "brick", name: "Brick à l'œuf", desc: "Feuille croustillante, œuf coulant, thon, persil et câpres. Deux pièces.", price: 6.5, category: "tunisienne", tags: [] },
  { id: "ojja", name: "Ojja merguez", desc: "Sauce tomate pimentée, poivrons, merguez et œufs pochés, pain maison.", price: 12.9, category: "tunisienne", tags: ["epice"] },
  { id: "lablabi", name: "Lablabi", desc: "Soupe de pois chiches, cumin, harissa, pain et œuf. Réconfort garanti.", price: 9.9, category: "tunisienne", tags: ["vege", "nouveau"] },

  // Rolls & salades
  { id: "roll-chicken", name: "Roll Poulet César", desc: "Wrap poulet grillé, sauce César, parmesan, romaine et croûtons.", price: 9.9, category: "rolls", tags: [] },
  { id: "roll-falafel", name: "Roll Falafel", desc: "Falafels maison, houmous, crudités et sauce tahini.", price: 9.5, category: "rolls", tags: ["vege"] },
  { id: "salade-cesar", name: "Salade César", desc: "Romaine, poulet crispy, parmesan, croûtons, sauce César maison.", price: 11.9, category: "rolls", tags: [] },

  // Desserts
  { id: "tiramisu", name: "Tiramisu Lotus", desc: "Crème mascarpone, biscuits Lotus, éclats caramélisés.", price: 5.9, category: "desserts", tags: ["populaire"] },
  { id: "cookie", name: "Cookie coulant", desc: "Cookie chaud au cœur chocolat, boule de glace vanille.", price: 6.5, category: "desserts", tags: [] },
  { id: "makroud", name: "Makrouds & thé", desc: "Pâtisseries tunisiennes aux dattes, thé à la menthe.", price: 5.5, category: "desserts", tags: ["nouveau"] },

  // Boissons
  { id: "soda", name: "Soda 33 cl", desc: "Coca-Cola, Fanta, Sprite, Oasis ou Ice Tea.", price: 2.5, category: "boissons", tags: [], options: [{ id: "parfum", name: "Ton choix", type: "single", required: true, choices: [{ label: "Coca-Cola" }, { label: "Fanta" }, { label: "Sprite" }, { label: "Oasis" }, { label: "Ice Tea" }] }] },
  { id: "citronnade", name: "Citronnade maison", desc: "Citron pressé, menthe fraîche, une touche de fleur d'oranger.", price: 4.5, category: "boissons", tags: ["nouveau"] },
  { id: "the-menthe", name: "Thé à la menthe", desc: "Servi chaud, comme il se doit.", price: 2.9, category: "boissons", tags: [] },
];

export const mercato = products.find((p) => p.id === "fish-chips")!;

export const euro = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
