import { Sparkles } from "lucide-react";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#home" className="inline-flex items-center gap-2.5" aria-label="Ailyt home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 shadow-lg shadow-blue-500/20">
        <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.4} />
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${dark ? "text-slate-950" : "text-white"}`}>Ailyt</span>
    </a>
  );
}
