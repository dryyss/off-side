"use client";

import { useState } from "react";

export default function ClubForm() {
  const [done, setDone] = useState(false);
  if (done)
    return (
      <p className="rounded-[var(--radius-btn)] bg-ink/20 px-5 py-4 text-lg font-semibold" role="status">
        Bienvenue chez les Supporters ⚽ Ton premier mail arrive bientôt.
      </p>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="club-email" className="sr-only">Ton e-mail</label>
      <input
        id="club-email"
        type="email"
        required
        placeholder="ton@email.fr"
        className="min-w-0 flex-1 rounded-[var(--radius-btn)] border-2 border-ink bg-white px-5 py-4 text-base text-ink placeholder:text-ink/40 focus:outline-none focus:ring-4 focus:ring-ink/30"
      />
      <button className="rounded-[var(--radius-btn)] bg-ink px-7 py-4 font-bold uppercase tracking-wider text-white transition hover:bg-ink/80">
        Je signe
      </button>
    </form>
  );
}
