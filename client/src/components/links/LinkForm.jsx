import { useEffect, useState } from "react";

const emptyState = {
  title: "",
  url: "",
};

const LinkForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(emptyState);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        url: initialData.url || "",
      });
      return;
    }

    setForm(emptyState);
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);

    if (!initialData) {
      setForm(emptyState);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
    >
      <h2 className="font-display text-xl text-slate-900">
        {initialData ? "Edit Link" : "Add New Link"}
      </h2>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm text-slate-700">Title</span>
          <input
            type="text"
            required
            value={form.title}
            onChange={(event) => {
              setForm((prev) => ({ ...prev, title: event.target.value }));
            }}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
            placeholder="My portfolio"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-slate-700">URL</span>
          <input
            type="url"
            required
            value={form.url}
            onChange={(event) => {
              setForm((prev) => ({ ...prev, url: event.target.value }));
            }}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
            placeholder="https://example.com"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : initialData ? "Update Link" : "Add Link"}
        </button>

        {initialData ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default LinkForm;
