import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOut, RefreshCw, Inbox } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Admin() {
  const [enquiries, setEnquiries] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = useCallback(async () => {
    const token = localStorage.getItem("dd_admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    try {
      const { data } = await axios.get(`${API}/enquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries(data);
      setError("");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("dd_admin_token");
        navigate("/admin/login");
      } else {
        setError("Could not load enquiries.");
        setEnquiries([]);
      }
    }
  }, [navigate]);

  useEffect(() => {
    load();
  }, [load]);

  const logout = () => {
    localStorage.removeItem("dd_admin_token");
    navigate("/admin/login");
  };

  return (
    <main className="min-h-screen bg-paper" data-testid="admin-dashboard">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-ink font-display text-sm font-bold text-white">
              12
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              Enquiries
            </span>
            {enquiries && (
              <span className="border border-line bg-paper px-2.5 py-0.5 text-xs font-semibold text-slate-600" data-testid="enquiries-count">
                {enquiries.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              data-testid="admin-refresh-button"
              onClick={load}
              className="flex items-center gap-2 border border-line px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-ink hover:text-ink"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button
              data-testid="admin-logout-button"
              onClick={logout}
              className="flex items-center gap-2 bg-ink px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12">
        {error && (
          <p data-testid="admin-error" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}
        {enquiries === null ? (
          <p className="py-20 text-center text-sm text-slate-500" data-testid="enquiries-loading">
            Loading enquiries…
          </p>
        ) : enquiries.length === 0 ? (
          <div className="flex flex-col items-center gap-4 border border-line bg-white py-24" data-testid="enquiries-empty">
            <Inbox className="h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate-500">
              No enquiries yet. Submissions from the contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-line bg-white" data-testid="enquiries-table">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-paper text-xs uppercase tracking-[0.15em] text-slate-500">
                  <th className="px-5 py-4 font-semibold">Received</th>
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Email</th>
                  <th className="px-5 py-4 font-semibold">Company</th>
                  <th className="px-5 py-4 font-semibold">Service</th>
                  <th className="px-5 py-4 font-semibold">Message</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((q) => (
                  <tr key={q.id} className="border-b border-line align-top last:border-0 hover:bg-paper" data-testid={`enquiry-row-${q.id}`}>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {new Date(q.created_at).toLocaleString()}
                    </td>
                    <td className="px-5 py-4 font-medium text-ink">{q.name}</td>
                    <td className="px-5 py-4 text-slate-600">{q.email}</td>
                    <td className="px-5 py-4 text-slate-600">{q.company || "—"}</td>
                    <td className="px-5 py-4">
                      <span className="border border-line bg-paper px-2.5 py-1 text-xs font-medium text-slate-600">
                        {q.service}
                      </span>
                    </td>
                    <td className="max-w-md px-5 py-4 text-slate-600">{q.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
