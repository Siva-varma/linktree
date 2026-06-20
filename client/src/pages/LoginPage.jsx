import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthCard from "../components/auth/AuthCard";
import { clearAuthError, loginUser } from "../features/auth/authSlice";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,_#ecfeff,_#eef2ff_45%,_#f8fafc_80%)] px-4 py-12">
      <div className="pointer-events-none absolute left-8 top-10 h-40 w-40 rounded-full bg-cyan-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-8 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />

      <div className="mx-auto grid min-h-[80vh] max-w-5xl place-items-center md:grid-cols-2 md:gap-8">
        <div className="hidden md:block">
          <h2 className="font-display text-5xl leading-tight text-slate-900">
            Grow your links.
            <br />
            Track every click.
          </h2>
          <p className="mt-4 max-w-sm text-slate-600">
            Sign in to manage your link hub, edit URLs instantly, and monitor
            performance in one dashboard.
          </p>
        </div>

        <AuthCard title="Login" subtitle="Welcome back to your dashboard">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm text-slate-700">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, email: event.target.value }));
                }}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm text-slate-700">
                Password
              </span>
              <input
                type="password"
                required
                value={form.password}
                onChange={(event) => {
                  setForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                }}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
                placeholder="********"
              />
            </label>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-600">
            New here?{" "}
            <Link
              to="/register"
              className="font-medium text-cyan-700 hover:underline"
            >
              Create account
            </Link>
          </p>
        </AuthCard>
      </div>
    </main>
  );
};

export default LoginPage;
