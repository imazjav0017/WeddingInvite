import Link from "next/link";
import { invitationVariants } from "@/lib/config/invitations";

export default function HomePage() {
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
              <div className="mt-2 text-lg font-semibold">{variant.label}</div>
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
