import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getRegistrationCatalog, registerRequest } from "../../api/authApi";
import Logo from "../../components/common/Logo";

type Role = "student" | "teacher" | "employee";
const fieldClass = "mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function Register() {
  const [role, setRole] = useState<Role>("student");
  const [form, setForm] = useState<Record<string, string>>({});
  const [photo, setPhoto] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const { data } = useQuery({ queryKey: ["registration-catalog"], queryFn: getRegistrationCatalog });
  const course = useMemo(() => data?.courses?.find((item: any) => String(item.id) === form.courseId), [data, form.courseId]);
  const set = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const removePhoto = () => {
    setPhoto(null);
    setError("");
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const choosePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      removePhoto();
      setError("Only JPEG, PNG, or WebP images are allowed.");
      return;
    }
    setPhoto(file);
    setError("");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true); setError(""); setMessage("");
    const payload = new FormData();
    Object.entries({ ...form, role }).forEach(([key, value]) => payload.append(key, value));
    if (photo) payload.append("profilePhoto", photo);
    try {
      const result = await registerRequest(payload);
      setMessage(result.message);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.errors?.join(" ") || err.response?.data?.message : "Registration failed.");
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-[#0B1120] px-5 py-5"><div className="mx-auto flex max-w-6xl items-center justify-between"><Logo /><Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" />Home</Link></div></header>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[.72fr_1.28fr]">
        <section><p className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">Join Ailyt</p><h1 className="mt-4 text-4xl font-extrabold text-slate-950">Start your journey with us.</h1><p className="mt-5 leading-7 text-slate-600">Create your account in a few simple steps. Students and employees can begin immediately; teacher accounts are reviewed by Admin.</p><div className="mt-8 space-y-3 text-sm font-semibold text-slate-600">{["Secure personal account", "Role-specific dashboard", "Simple progress and work management"].map((item) => <p key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{item}</p>)}</div></section>
        <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1">{(["student", "teacher", "employee"] as Role[]).map((item) => <button key={item} type="button" onClick={() => { setRole(item); setError(""); }} className={`rounded-lg py-2.5 text-sm font-bold capitalize ${role === item ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}>{item}</button>)}</div>
          {message ? <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center text-emerald-700"><CheckCircle2 className="mx-auto h-7 w-7" /><p className="mt-2 font-bold">{message}</p><Link to="/login" className="mt-4 inline-block text-sm underline">Continue to login</Link></div> : (
            <form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2">
              {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{error}</div>}
              {[['name', 'Full name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone', 'tel']].map(([key, label, type]) => <label key={key} className="text-sm font-semibold text-slate-700">{label}<input type={type} value={form[key] || ""} onChange={(e) => set(key, e.target.value)} required className={fieldClass} /></label>)}
              <label className="text-sm font-semibold text-slate-700">Password<div className="relative"><input type={showPassword ? "text" : "password"} value={form.password || ""} onChange={(e) => set("password", e.target.value)} required className={`${fieldClass} pr-11`} /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-[1.15rem] rounded p-1 text-slate-400 hover:text-slate-700" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}</button></div></label>
              {role === "student" && <><label className="text-sm font-semibold text-slate-700">Course<select value={form.courseId || ""} onChange={(e) => { set("courseId", e.target.value); set("batchId", ""); }} required className={fieldClass}><option value="">Select course</option>{data?.courses?.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="text-sm font-semibold text-slate-700">Preferred batch<select value={form.batchId || ""} onChange={(e) => set("batchId", e.target.value)} required className={fieldClass}><option value="">Select batch</option>{course?.batches?.map((item: any) => <option key={item.id} value={item.id}>{item.name} · {item.timing}</option>)}</select></label></>}
              {role === "teacher" && <><label className="text-sm font-semibold text-slate-700">Expertise<input value={form.expertise || ""} onChange={(e) => set("expertise", e.target.value)} required className={fieldClass} /></label><label className="text-sm font-semibold text-slate-700">Qualification<input value={form.qualification || ""} onChange={(e) => set("qualification", e.target.value)} required className={fieldClass} /></label></>}
              {role === "employee" && <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Department<select value={form.department || ""} onChange={(e) => set("department", e.target.value)} required className={fieldClass}><option value="">Select department</option><option value="shop">Shop Counter</option><option value="both">Teaching-support & Shop</option></select></label>}
              <div className="text-sm font-semibold text-slate-700 sm:col-span-2">Profile photo <span className="font-normal text-slate-400">(optional)</span>{photo ? <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"><Upload className="h-5 w-5 shrink-0 text-blue-500" /><span className="min-w-0 flex-1 truncate font-normal text-slate-600">{photo.name}</span><button type="button" onClick={removePhoto} className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50" aria-label="Remove profile photo"><X className="h-4 w-4" />Remove</button></div> : <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 p-4 font-normal text-slate-500 hover:border-blue-400 hover:bg-blue-50/40"><Upload className="h-5 w-5 text-blue-500" />Choose JPEG, PNG, or WebP<input ref={photoInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} className="hidden" /></label>}</div>
              <button disabled={loading} className="rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white sm:col-span-2 disabled:opacity-60">{loading ? "Creating account…" : "Create account"}</button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
