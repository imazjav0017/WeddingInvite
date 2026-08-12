import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell flex min-h-screen items-center py-12">
      <section className="section-card w-full px-6 py-10 text-center sm:px-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          404
        </p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl">
          Invitation not found
        </h1>
        <p className="mt-4 text-sm leading-7 text-black/70 sm:text-base">
          That invitation variant does not exist. Please return to the invitation
          list and choose a valid route.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-white"
          href="/"
        >
          Back to variants
        </Link>
      </section>
    </main>
  );
}
