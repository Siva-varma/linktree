import { Link } from "react-router-dom";
import heroIllustration from "../assets/hero-illustration.svg";
import analyticsIllustration from "../assets/analytics-illustration.svg";
import profileIllustration from "../assets/profile-illustration.svg";

const features = [
  {
    title: "Custom public profile",
    description:
      "Create one shareable page with your links and make your username the destination.",
  },
  {
    title: "Instant link management",
    description:
      "Add, edit, and reorder links from one dashboard so your profile always stays current.",
  },
  {
    title: "Click analytics",
    description:
      "Track total clicks and link-level performance with visual insights in real time.",
  },
  {
    title: "Secure account access",
    description:
      "Authenticate once and manage your link hub safely with protected routes and sessions.",
  },
];

const Landing = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#ecfeff,#eef2ff_45%,#f8fafc_80%)] text-slate-900">
      <div className="pointer-events-none absolute left-8 top-12 h-44 w-44 rounded-full bg-cyan-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 right-8 h-44 w-44 rounded-full bg-emerald-200/60 blur-3xl" />

      <section className="relative px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-14 flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-2xl tracking-tight text-slate-900">
              LinkHub
            </p>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Get started
              </Link>
            </div>
          </header>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700">
                Build your link hub in minutes
              </p>

              <h1 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                One profile.
                <br />
                Every important link.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Launch a clean public page for your audience, manage links from
                a focused dashboard, and understand what gets attention through
                built-in analytics.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Create free account
                </Link>
                <Link
                  to="/login"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Open dashboard
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src={heroIllustration}
                alt="LinkHub - Centralized link management platform"
                className="h-auto w-full drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl sm:text-4xl">Core Features</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Everything you need to publish, manage, and track your personal link
            page without clutter.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-xl text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src={profileIllustration}
              alt="Illustration of a profile with quick links"
              className="w-full"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl text-slate-900">
                Public profile that stays on-brand
              </h3>
              <p className="mt-2 text-slate-600">
                Share your username URL once and keep updating your links behind
                the scenes whenever priorities change.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src={analyticsIllustration}
              alt="Illustration of link analytics and click trends"
              className="w-full"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl text-slate-900">
                Analytics that drive better decisions
              </h3>
              <p className="mt-2 text-slate-600">
                Spot your highest-performing links quickly and optimize what you
                promote based on real click behavior.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-xl">
          <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">
            Start building your link page today
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Set up your profile, add your important destinations, and start
            tracking traffic in a few minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/register"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Create account
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
