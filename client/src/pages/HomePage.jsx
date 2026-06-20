import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/layout/AppLayout";
import LinkForm from "../components/links/LinkForm";
import LinksList from "../components/links/LinksList";
import AnalysisGraph from "../components/links/AnalysisGraph";
import { logout } from "../features/auth/authSlice";
import {
  clearLinksError,
  createLink,
  fetchAnalysis,
  removeLink,
  updateLink,
} from "../features/links/linksSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { analysis, loading, actionLoading, error } = useSelector(
    (state) => state.links,
  );

  const [editingLink, setEditingLink] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    dispatch(fetchAnalysis());

    return () => {
      dispatch(clearLinksError());
    };
  }, [dispatch]);

  const summary = useMemo(() => {
    return {
      totalLinks: analysis.totalLinks || 0,
      totalClicks: analysis.totalClicks || 0,
    };
  }, [analysis.totalClicks, analysis.totalLinks]);

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const customLink = useMemo(() => {
    if (!user?.username) {
      return "";
    }
    return `${window.location.origin}/${user.username}`;
  }, [user?.username]);

  const handleCreateOrUpdate = (payload) => {
    if (editingLink?._id) {
      dispatch(updateLink({ id: editingLink._id, payload }));
      setEditingLink(null);
      return;
    }

    dispatch(createLink(payload));
  };

  const handleDelete = (id) => {
    dispatch(removeLink(id));
  };

  const handleCopyCustomLink = async () => {
    if (!customLink) {
      return;
    }

    try {
      await navigator.clipboard.writeText(customLink);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AppLayout>
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-slate-900">
              Link Dashboard
            </h1>
            <p className="mt-1 text-slate-600">
              Welcome, <span className="font-medium">{user?.username}</span>
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-slate-500">This is your custom link:</span>
              <a
                href={customLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-slate-100 px-2 py-1 font-medium text-cyan-700"
              >
                {customLink}
              </a>
              <button
                type="button"
                onClick={handleCopyCustomLink}
                className="rounded-lg border border-slate-300 px-3 py-1 text-xs text-slate-700 transition hover:bg-slate-100"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => dispatch(logout())}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
          >
            Logout
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-900 p-5 text-white">
            <p className="text-sm text-slate-300">Total Links</p>
            <p className="mt-2 font-display text-4xl">{summary.totalLinks}</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-cyan-600 to-emerald-600 p-5 text-white">
            <p className="text-sm text-cyan-100">Total Clicks</p>
            <p className="mt-2 font-display text-4xl">{summary.totalClicks}</p>
          </div>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.25fr]">
        <LinkForm
          initialData={editingLink}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setEditingLink(null)}
          loading={actionLoading}
        />

        <LinksList
          links={analysis.links || []}
          onEdit={setEditingLink}
          onDelete={handleDelete}
          loading={actionLoading}
        />
      </div>

      <div className="mt-6">
        <AnalysisGraph links={analysis.links || []} />
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-slate-500">Loading analytics...</p>
      ) : null}

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}
    </AppLayout>
  );
};

export default HomePage;
