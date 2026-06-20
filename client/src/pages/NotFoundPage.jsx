import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <p className="font-display text-6xl text-slate-900">404</p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-slate-600">
          The page you requested does not exist.
        </p>

        <Link
          to="/home"
          className="mt-5 inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
