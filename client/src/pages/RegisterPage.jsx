import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthCard from "../components/auth/AuthCard";
import { clearAuthError, registerUser } from "../features/auth/authSlice";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
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
    dispatch(registerUser(form));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_80%_20%,_#dcfce7,_#e0f2fe_45%,_#f8fafc_80%)] px-4 py-12">
      <div className="pointer-events-none absolute left-8 top-10 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-8 h-40 w-40 rounded-full bg-cyan-200/50 blur-3xl" />

      <div className="mx-auto grid min-h-[80vh] max-w-5xl place-items-center md:grid-cols-2 md:gap-8">
        <div className="hidden md:block">
          <h2 className="font-display text-5xl leading-tight text-slate-900">
            Build your profile.
            <br />
            Share smarter.
          </h2>
          <p className="mt-4 max-w-sm text-slate-600">
            Create your account to manage all links in one place with simple
            analytics.
          </p>
        </div>

        <AuthCard title="Register" subtitle="Create your account">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm text-slate-700">
                Username
              </span>
              <input
                type="text"
                required
                value={form.username}
                onChange={(event) => {
                  setForm((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }));
                }}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
                placeholder="siva"
              />
            </label>

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
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-cyan-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </AuthCard>
      </div>
    </main>
  );
};

export default RegisterPage;
