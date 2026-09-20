"use client";

import { useState } from "react";
import Link from "next/link";
import { invitationVariants } from "@/lib/config/invitations";

const PASSWORD = "imzee@1213"; // change this

export default function HomePage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Password screen
  if (!unlocked) {
    return (
      <main className="page-shell flex min-h-screen flex-col justify-center py-12">
        <section className="section-card px-6 py-10 sm:px-10">
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl">
            Imaz &amp; Zeba
          </h1>

          <p className="mt-4 text-sm text-black/70">
            Enter password to view invitation variants.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 max-w-sm">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3"
            />

            {error && (
              <p className="mt-2 text-sm text-red-600">
                Incorrect password
              </p>
            )}

            <button
              type="submit"
              className="mt-4 rounded-2xl bg-black px-6 py-3 text-white"
            >
              Enter
            </button>
          </form>
        </section>
      </main>
    );
  }

  // Variants screen
  return (
    <main className="page-shell flex min-h-screen flex-col justify-center py-12">
      <section className="section-card px-6 py-10 sm:px-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          Wedding Invitation Foundation
        </p>

        <h1 className="mt-4 font-[var(--font-display)] text-4xl sm:text-5xl">
          Imaz &amp; Zeba
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
          This starter route lists the sample invitation variants. Each invite
          uses the same shared page architecture and loads its own configuration
          from the URL.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {invitationVariants.map((variant) => (
            <Link
              key={variant.id}
              className="rounded-3xl border border-black/10 bg-white/80 px-4 py-4 transition hover:-translate-y-0.5 hover:bg-white"
              href={`/${variant.id}`}
            >
              <div className="text-sm uppercase tracking-[0.25em] text-[var(--accent)]">
                Variant {variant.id}
              </div>

              <div className="mt-2 text-lg font-semibold">
                {variant.label}
              </div>

              <div className="mt-1 text-sm text-black/65">
                Events: {variant.events.join(", ")}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}