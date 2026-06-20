const LinksList = ({ links, onEdit, onDelete, loading }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-xl text-slate-900">Manage Links</h2>
        <p className="text-sm text-slate-500">{links.length} total</p>
      </div>

      <div className="mt-5 space-y-3">
        {links.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
            No links yet. Add your first link to start tracking clicks.
          </p>
        ) : null}

        {links.map((link) => (
          <article
            key={link._id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="min-w-0">
              <h3 className="truncate font-medium text-slate-900">
                {link.title}
              </h3>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="truncate text-sm text-cyan-700 hover:underline"
              >
                {link.url}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(link)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
              >
                Edit
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => onDelete(link._id)}
                className="rounded-lg border border-rose-300 px-3 py-1.5 text-sm text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LinksList;
