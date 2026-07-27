import { CalendarCheck2, Clock3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RoleDashboard() {
  const { user } = useAuth();
  return <div><p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">{user?.role} dashboard</p><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Welcome, {user?.name}</h1><p className="mt-2 text-sm text-slate-500">Your Ailyt workspace is ready.</p><div className="mt-8 grid gap-5 sm:grid-cols-3"><div className="rounded-2xl border-l-4 border-blue-500 bg-white p-5 shadow-sm"><CalendarCheck2 className="h-5 w-5 text-blue-500" /><p className="mt-5 font-bold">Attendance</p><p className="mt-1 text-sm text-slate-500">Review your attendance history.</p><Link to={`/${user?.role}/my-attendance`} className="mt-4 inline-block text-sm font-bold text-blue-600">View records →</Link></div><div className="rounded-2xl border-l-4 border-emerald-500 bg-white p-5 shadow-sm"><Sparkles className="h-5 w-5 text-emerald-500" /><p className="mt-5 font-bold">Account active</p><p className="mt-1 text-sm text-slate-500">Your portal access is enabled.</p></div><div className="rounded-2xl border-l-4 border-orange-500 bg-white p-5 shadow-sm"><Clock3 className="h-5 w-5 text-orange-500" /><p className="mt-5 font-bold">More tools soon</p><p className="mt-1 text-sm text-slate-500">New modules appear as they are enabled.</p></div></div></div>;
}
