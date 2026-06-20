const AnalysisGraph = ({ links }) => {
  const peak = links.reduce((max, link) => {
    return Math.max(max, link.noOfClicks || 0);
  }, 0);

  const maxClicks = peak > 0 ? peak : 1;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <h2 className="font-display text-xl text-slate-900">Clicks Analysis</h2>
      <p className="mt-1 text-sm text-slate-500">
        Visual breakdown of click count per link.
      </p>

      <div className="mt-5 space-y-4">
        {links.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
            No data to show yet.
          </p>
        ) : null}

        {links.map((link) => {
          const clicks = link.noOfClicks || 0;
          const width = (clicks / maxClicks) * 100;

          return (
            <div key={link._id || link.url}>
              <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                <span className="truncate text-slate-700">{link.title}</span>
                <span className="font-medium text-slate-900">{clicks}</span>
              </div>

              <div className="h-3 rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-linear-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AnalysisGraph;
