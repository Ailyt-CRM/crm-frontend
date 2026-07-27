import { useState } from "react";
import {
  ArrowRight, BadgeCheck, BookOpen, Braces, CheckCircle2, ChevronRight, Code2, Coffee,
  Cpu, FileBadge, FileText, GraduationCap, Laptop, MapPin,
  Menu, MonitorUp, Palette, Phone, Printer, ScanLine, ShieldCheck, Smartphone, Sparkles,
  Users, Wifi, X, Zap
} from "lucide-react";
import Logo from "../../components/common/Logo";

const courses = [
  { name: "C Programming", note: "Programming fundamentals", icon: Braces, color: "blue" },
  { name: "C++", note: "Object-oriented concepts", icon: Code2, color: "violet" },
  { name: "Python", note: "Build practical applications", icon: Cpu, color: "emerald" },
  { name: "Java", note: "Industry-ready development", icon: Coffee, color: "orange" },
  { name: "Web Development", note: "Modern websites & apps", icon: MonitorUp, color: "cyan" },
  { name: "Tally", note: "Accounting & GST essentials", icon: FileText, color: "amber" },
  { name: "Photoshop", note: "Creative visual design", icon: Palette, color: "pink" }
];

const services = [
  { name: "Printing", note: "Color and B&W prints", icon: Printer },
  { name: "Xerox", note: "Fast, clear photocopies", icon: ScanLine },
  { name: "PAN & Aadhaar", note: "Application assistance", icon: FileBadge },
  { name: "Recharge", note: "Mobile and DTH recharge", icon: Smartphone }
];

const courseColors: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600", violet: "bg-violet-50 text-violet-600", emerald: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-600", cyan: "bg-cyan-50 text-cyan-600", amber: "bg-amber-50 text-amber-600", pink: "bg-pink-50 text-pink-600"
};

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 leading-7 text-slate-600">{copy}</p>
    </div>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = ["About", "Courses", "Services", "Contact"];

  return (
    <main className="overflow-hidden bg-white">
      <section id="home" className="relative min-h-[760px] bg-gradient-to-br from-[#0A0E1A] via-[#0B1526] to-[#0F1B2E] text-white">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-glow absolute -right-40 top-16 h-[680px] w-[680px]" />
        <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 transition hover:text-white">{item}</a>)}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="/login" className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:text-white">Login</a>
            <a href="/register" className="rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400">Register</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-white/10 p-2 text-slate-200 md:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          {menuOpen && (
            <div className="absolute left-5 right-5 top-20 rounded-2xl border border-white/10 bg-[#101a2b] p-4 shadow-2xl md:hidden">
              {nav.map((item) => <a key={item} onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`} className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-200 hover:bg-white/5">{item}</a>)}
              <div className="mt-2 grid grid-cols-2 gap-2"><a href="/login" className="rounded-lg border border-white/10 py-2.5 text-center text-sm font-semibold">Login</a><a href="/register" className="rounded-lg bg-blue-500 py-2.5 text-center text-sm font-semibold">Register</a></div>
            </div>
          )}
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-16 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/5 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200">
              <Sparkles className="h-3.5 w-3.5" /> Training & Cyber Services
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-6xl lg:text-[68px]">
              Learn skills. Access <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">digital services.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">A trusted neighborhood destination for practical computer education and reliable cyber café services—all under one roof.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 px-6 py-3.5 text-sm font-bold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5">Enroll Now <ArrowRight className="h-4 w-4" /></a>
              <a href="/login" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-slate-100 transition hover:bg-white/[0.08]">Student Login <ChevronRight className="h-4 w-4" /></a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              {["Practical training", "Expert guidance", "Affordable services"].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />{item}</span>)}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:ml-auto">
            <div className="absolute -inset-10 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative rounded-[28px] border border-white/10 bg-white/[0.055] p-4 shadow-glow backdrop-blur-xl">
              <div className="rounded-2xl border border-white/10 bg-[#0B1424]/90 p-5 sm:p-7">
                <div className="mb-8 flex items-center justify-between"><div><p className="text-xs font-medium text-slate-500">Your learning space</p><p className="mt-1 font-bold">Ailyt Student Portal</p></div><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">Active</span></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/5 bg-white/[0.035] p-4"><BookOpen className="mb-5 h-5 w-5 text-blue-400" /><p className="text-2xl font-extrabold">7+</p><p className="mt-1 text-xs text-slate-500">Career courses</p></div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.035] p-4"><Users className="mb-5 h-5 w-5 text-emerald-400" /><p className="text-2xl font-extrabold">1:1</p><p className="mt-1 text-xs text-slate-500">Personal guidance</p></div>
                </div>
                <div className="mt-3 rounded-xl border border-white/5 bg-white/[0.035] p-4"><div className="mb-3 flex justify-between text-xs"><span className="text-slate-400">Course progress</span><span className="font-semibold text-blue-300">72%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 to-emerald-400" /></div></div>
                <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10"><GraduationCap className="h-5 w-5 text-blue-300" /></span><div><p className="text-sm font-semibold">Build job-ready confidence</p><p className="mt-0.5 text-xs text-slate-500">Learn by doing, every day.</p></div></div>
              </div>
            </div>
            <div className="absolute -left-8 top-16 hidden h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-[#111d30] shadow-xl sm:grid"><Code2 className="text-blue-300" /></div>
            <div className="absolute -right-7 bottom-24 hidden h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-[#111d30] shadow-xl sm:grid"><Wifi className="text-emerald-300" /></div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <div className="relative rounded-3xl bg-slate-950 p-8 text-white sm:p-10"><div className="absolute right-7 top-7 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl" /><Laptop className="h-10 w-10 text-blue-400" /><p className="mt-14 text-3xl font-extrabold leading-tight">Technology should feel accessible to everyone.</p><div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8"><div><p className="text-3xl font-extrabold text-emerald-400">7+</p><p className="mt-1 text-xs text-slate-400">Practical courses</p></div><div><p className="text-3xl font-extrabold text-blue-400">10+</p><p className="mt-1 text-xs text-slate-400">Digital services</p></div></div></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">About Ailyt</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">One place to learn, create, and get things done.</h2><p className="mt-6 leading-8 text-slate-600">Ailyt combines hands-on computer training with dependable everyday cyber services. We help students build useful skills and make essential digital tasks simpler for our community.</p><div className="mt-8 space-y-4">{["Beginner-friendly, practical instruction", "Current tools and industry-relevant curriculum", "Friendly support for essential online services"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700"><span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-50"><CheckCircle2 className="h-4 w-4 text-emerald-600" /></span>{item}</div>)}</div></div>
        </div>
      </section>

      <section id="courses" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Explore courses" title="Skills that open new doors" copy="Choose from focused, practical courses designed for beginners, students, and working professionals." /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{courses.map(({ name, note, icon: Icon, color }) => <article key={name} className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-card"><span className={`grid h-12 w-12 place-items-center rounded-xl ${courseColors[color]}`}><Icon className="h-5 w-5" /></span><h3 className="mt-6 font-bold text-slate-950">{name}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{note}</p><a href="/register" className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-blue-600 opacity-80 transition group-hover:opacity-100">Learn more <ArrowRight className="h-3.5 w-3.5" /></a></article>)}</div></div>
      </section>

      <section id="services" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Cyber café services" title="Everyday digital work, handled" copy="Quick, accurate, and affordable support for the digital tasks that keep life moving." /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(({ name, note, icon: Icon }) => <article key={name} className="rounded-2xl bg-slate-950 p-6 text-white"><span className="grid h-11 w-11 place-items-center rounded-xl border border-blue-400/20 bg-blue-400/10"><Icon className="h-5 w-5 text-blue-300" /></span><h3 className="mt-6 font-bold">{name}</h3><p className="mt-2 text-sm text-slate-400">{note}</p></article>)}</div></div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Why choose us" title="Local support. Lasting skills." copy="A practical learning environment backed by helpful people and reliable service." /><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{[
          [GraduationCap, "Practical learning", "Build confidence through guided, hands-on exercises."], [BadgeCheck, "Expert guidance", "Learn with clear explanations and personal attention."], [Zap, "Fast service", "Get your cyber café work completed without the long wait."], [ShieldCheck, "Trusted support", "Your documents and information are handled responsibly."]
        ].map(([Icon, title, copy]) => { const I = Icon as typeof GraduationCap; return <div key={title as string} className="text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm"><I /></span><h3 className="mt-5 font-bold text-slate-950">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{copy as string}</p></div>; })}</div></div>
      </section>

      <section id="contact" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1120] to-[#0F1B2E] text-white"><div className="grid lg:grid-cols-[.85fr_1.15fr]"><div className="p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Contact us</p><h2 className="mt-4 text-3xl font-extrabold">Ready to get started?</h2><p className="mt-4 leading-7 text-slate-400">Visit our center, call us, or enroll online. We’ll help you find the right course or service.</p><div className="mt-8 space-y-5 text-sm"><div className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-emerald-400" /><span className="text-slate-300">Your local Ailyt training institute & cyber café</span></div><div className="flex gap-3"><Phone className="h-5 w-5 text-emerald-400" /><span className="text-slate-300">Contact number available at the center</span></div></div><a href="/register" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold hover:bg-blue-400">Enroll today <ArrowRight className="h-4 w-4" /></a></div><div className="relative min-h-72 bg-[#15243b]"><div className="absolute inset-0 opacity-40 hero-grid" /><div className="absolute inset-0 grid place-items-center"><div className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 text-center shadow-2xl backdrop-blur"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-400/10"><MapPin className="text-emerald-300" /></span><p className="mt-4 font-bold">Ailyt Center</p><p className="mt-1 text-xs text-slate-400">Training & digital services near you</p></div></div></div></div></div></div>
      </section>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row lg:px-8"><Logo dark /><p className="text-xs text-slate-500">© {new Date().getFullYear()} Ailyt. Learn. Build. Grow.</p><div className="flex gap-5 text-xs font-medium text-slate-500"><a href="#about" className="hover:text-slate-950">About</a><a href="#courses" className="hover:text-slate-950">Courses</a><a href="#contact" className="hover:text-slate-950">Contact</a></div></div></footer>
    </main>
  );
}
