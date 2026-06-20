const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/40 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-emerald-300/40 blur-2xl" />

      <h1 className="font-display text-3xl text-slate-900">{title}</h1>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>

      <div className="mt-6">{children}</div>
    </div>
  );
};

export default AuthCard;
