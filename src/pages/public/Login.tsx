import { useState, type FormEvent } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../components/common/Logo";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const { login } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const user = await login(email, password);
      if (user.status === "pending") setError("Your account is awaiting approval.");
      else if (user.role === "admin") navigate((location.state as { from?: { pathname: string } })?.from?.pathname || "/admin/dashboard", { replace: true });
      else navigate(`/${user.role}/dashboard`, { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Cannot reach the Ailyt API. Check that the server is running and the frontend origin is allowed.");
      } else {
        setError("Unable to complete login. Please try again.");
      }
    }
    finally { setLoading(false); }
  };
  return <main className="grid min-h-screen bg-slate-50 lg:grid-cols-2"><section className="hidden bg-gradient-to-br from-ink to-navy p-12 text-white lg:flex lg:flex-col"><Logo /><div className="my-auto max-w-lg"><p className="text-xs font-bold uppercase tracking-[.2em] text-blue-300">Ailyt ERP</p><h1 className="mt-5 text-5xl font-extrabold leading-tight">Everything your center needs, in one place.</h1><p className="mt-6 leading-8 text-slate-400">Manage learning, staff, operations, and service with a clear view of the day.</p></div></section><section className="flex items-center justify-center p-6"><div className="w-full max-w-md"><Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft className="h-4 w-4" />Back to home</Link><h2 className="text-3xl font-extrabold text-slate-950">Welcome back</h2><p className="mt-2 text-sm text-slate-500">Sign in to your Ailyt account.</p>{error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}<form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-semibold text-slate-700">Email<div className="relative mt-2"><Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required /></div></label><label className="block text-sm font-semibold text-slate-700">Password<div className="relative mt-2"><LockKeyhole className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" /><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-3 rounded p-1 text-slate-400 hover:text-slate-700" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}</button></div></label><button disabled={loading} className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button></form></div></section></main>;
}
