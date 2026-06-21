import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const PublicProfilePage = () => {
  const { username } = useParams();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clickedId, setClickedId] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/links/${username}`);
        setLinks(response.data.links || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load links");
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [username]);

  const handleLinkClick = async (link) => {
    try {
      setClickedId(link._id);
      await api.put(`/links/${link._id}/click`);
    } catch {
      // Redirect should still happen even if click tracking fails.
    } finally {
      window.location.href = link.url;
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe,#f8fafc_45%,#e0f2fe_85%)] px-4 py-10">
      <div className="mx-auto w-full max-w-90 md:max-w-xl rounded-2xl border border-white/50 bg-white/80 p-6 shadow-2xl backdrop-blur md:p-8">
        <h1 className="font-display text-3xl text-slate-900 md:text-4xl">
          @{username}
        </h1>
        <p className="mt-2 text-sm text-slate-600">All Links</p>

        {loading ? (
          <p className="mt-6 text-sm text-slate-500">Loading links...</p>
        ) : null}

        {error ? (
          <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        {!loading && !error && links.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            No links found for this user.
          </p>
        ) : null}

        <div className="mt-6 space-y-3">
          {links.map((link) => (
            <button
              key={link._id}
              type="button"
              onClick={() => handleLinkClick(link)}
              disabled={clickedId === link._id}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="font-medium text-slate-900 hover:text-slate-700">{link.title}</span>
              <span className="text-xs text-slate-500 hover:text-slate-700">
                {clickedId === link._id ? "Opening..." : "Open"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PublicProfilePage;
