import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const formatDetail = (detail) => {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).join(" ");
  return String(detail);
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem("dd_admin_token", data.token);
      navigate("/admin");
    } catch (err) {
      setError(formatDetail(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6" data-testid="admin-login-page">
      <div className="w-full max-w-md border border-line bg-white p-10">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-ink font-display text-sm font-bold text-white">
            12
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            DUODECIMAL
          </span>
        </div>
        <h1 className="mt-8 font-display text-2xl font-bold tracking-tight text-ink">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Access the enquiries dashboard.
        </p>
        <form onSubmit={submit} className="mt-8 space-y-5" data-testid="admin-login-form">
          <div>
            <label htmlFor="admin-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Email
            </label>
            <input
              id="admin-email"
              data-testid="admin-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-brand"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Password
            </label>
            <input
              id="admin-password"
              data-testid="admin-password-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-brand"
            />
          </div>
          {error && (
            <p data-testid="admin-login-error" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            data-testid="admin-login-submit"
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>
        </form>
        <a href="/" className="mt-6 inline-block text-sm text-slate-400 transition-colors duration-200 hover:text-brand" data-testid="admin-login-back-link">
          Back to site
        </a>
      </div>
    </main>
  );
}
