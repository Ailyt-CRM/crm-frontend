import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, ClipboardList, Download, Plus, Send, Trash2, Users } from "lucide-react";
import { learningApi } from "../../api/learningApi";
import Modal from "../../components/common/Modal";
import { useAuth } from "../../context/AuthContext";

type ModalName = "create" | "submit" | "submissions" | "grade" | null;
const submissionDate = (value: unknown) => {
  const date = new Date(String(value || ""));
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleString("en-IN");
};

export default function Assignments() {
  const { user } = useAuth();
  const student = user?.role === "student";
  const canManage = user?.role === "admin" || user?.role === "teacher";
  const client = useQueryClient();
  const [modal, setModal] = useState<ModalName>(null);
  const [selected, setSelected] = useState<any>(null);
  const [grading, setGrading] = useState<any>(null);
  const [marks, setMarks] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const { data = [] } = useQuery({ queryKey: ["assignments"], queryFn: learningApi.assignments });
  const { data: batches = [] } = useQuery({ queryKey: ["learning-batches"], queryFn: learningApi.batches });
  const { data: submissions = [] } = useQuery({ queryKey: ["submissions", selected?.id], queryFn: () => learningApi.submissions(selected.id), enabled: (modal === "submissions" || modal === "grade") && Boolean(selected) });
  const create = useMutation({ mutationFn: () => learningApi.createAssignment(form), onSuccess: () => { client.invalidateQueries({ queryKey: ["assignments"] }); setModal(null); } });
  const submit = useMutation({ mutationFn: () => { const body = new FormData(); if (file) body.append("file", file); return learningApi.submit(selected.id, body); }, onSuccess: () => { client.invalidateQueries({ queryKey: ["assignments"] }); setModal(null); } });
  const remove = useMutation({ mutationFn: learningApi.deleteAssignment, onSuccess: () => client.invalidateQueries({ queryKey: ["assignments"] }) });
  const saveGrade = useMutation({
    mutationFn: () => learningApi.grade(grading.id, Number(marks)),
    onSuccess: () => { client.invalidateQueries({ queryKey: ["submissions", selected.id] }); setGrading(null); setModal("submissions"); }
  });
  const openGrade = (submission: any) => { setGrading(submission); setMarks(submission.marksObtained == null ? "" : String(submission.marksObtained)); setModal("grade"); };

  return <div>
    <div className="flex justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">Coursework</p><h1 className="mt-1 text-3xl font-extrabold">Assignments</h1><p className="mt-2 text-sm text-slate-500">Create, submit, and grade batch assignments.</p></div>{canManage && <button onClick={() => { setForm({}); setModal("create"); }} className="self-end rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"><Plus className="mr-2 inline h-4 w-4" />New assignment</button>}</div>
    <div className="mt-7 space-y-4">{data.length === 0 ? <p className="rounded-2xl bg-white p-10 text-center text-slate-500">No assignments found.</p> : data.map((item: any) => { const own = item.submissions?.[0]; return <article key={item.id} className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex flex-col gap-4 sm:flex-row"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-50"><ClipboardList className="h-5 w-5 text-violet-600" /></span><div className="flex-1"><h2 className="font-bold">{item.title}</h2><p className="mt-1 text-sm text-slate-500">{item.description || "No description"}</p><div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400"><span>{item.batch.course.name} · {item.batch.name}</span><span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />Due {new Date(item.dueDate).toLocaleDateString("en-IN")}</span></div></div><div className="flex items-start gap-2">{student && <button onClick={() => { setSelected(item); setFile(null); setModal("submit"); }} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white"><Send className="mr-1 inline h-3.5 w-3.5" />{own ? "Resubmit" : "Submit"}</button>}{canManage && <><button onClick={() => { setSelected(item); setModal("submissions"); }} className="rounded-lg border px-3 py-2 text-xs font-bold"><Users className="mr-1 inline h-3.5 w-3.5" />Submissions</button><button onClick={() => confirm("Delete assignment?") && remove.mutate(item.id)} className="rounded-lg border border-red-100 p-2 text-red-500"><Trash2 className="h-4 w-4" /></button></>}</div></div>{own && <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">Submitted {submissionDate(own.submittedAt)} · Marks: {own.marksObtained ?? "Not graded"}</div>}</article>; })}</div>
    {modal === "create" && <Modal title="Create assignment" onClose={() => setModal(null)}><form onSubmit={(e: FormEvent) => { e.preventDefault(); create.mutate(); }} className="space-y-5 p-6"><input placeholder="Assignment title" required onChange={e => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border px-3 py-3" /><textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border px-3 py-3" /><select required onChange={e => setForm({ ...form, batchId: e.target.value })} className="w-full rounded-xl border px-3 py-3"><option value="">Select batch</option>{batches.map((b: any) => <option key={b.id} value={b.id}>{b.course.name} · {b.name}</option>)}</select><input type="datetime-local" required onChange={e => setForm({ ...form, dueDate: e.target.value })} className="w-full rounded-xl border px-3 py-3" /><button className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white">Create assignment</button></form></Modal>}
    {modal === "submit" && <Modal title={`Submit · ${selected.title}`} onClose={() => setModal(null)}><form onSubmit={(e: FormEvent) => { e.preventDefault(); submit.mutate(); }} className="space-y-5 p-6"><input type="file" required onChange={e => setFile(e.target.files?.[0] || null)} className="w-full rounded-xl border p-3" /><button className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white">Upload submission</button></form></Modal>}
    {modal === "submissions" && <Modal title={`Submissions · ${selected.title}`} onClose={() => setModal(null)}><div className="divide-y p-6">{submissions.length === 0 ? <p className="text-sm text-slate-500">No submissions yet.</p> : submissions.map((sub: any) => <div key={sub.id} className="flex items-center gap-3 py-4"><div className="flex-1"><p className="font-bold">{sub.student.user.name}</p><p className="text-xs text-slate-400">{submissionDate(sub.submittedAt)}</p></div><button type="button" onClick={() => learningApi.downloadSubmission(sub.id)} className="p-2 text-blue-600" title="Download submission"><Download className="h-4 w-4" /></button><button type="button" onClick={() => openGrade(sub)} className="rounded-lg bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700">Grade: {sub.marksObtained ?? "—"}</button></div>)}</div></Modal>}
    {modal === "grade" && grading && <Modal title={`Grade · ${grading.student.user.name}`} onClose={() => { setGrading(null); setModal("submissions"); }}><form onSubmit={(e: FormEvent) => { e.preventDefault(); saveGrade.mutate(); }} className="space-y-5 p-6"><label className="block text-sm font-semibold text-slate-700">Marks obtained<input type="number" min="0" step="0.01" value={marks} onChange={e => setMarks(e.target.value)} autoFocus required className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal" /></label>{saveGrade.isError && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">Could not save marks. Enter zero or a positive number.</p>}<div className="flex justify-end gap-3"><button type="button" onClick={() => { setGrading(null); setModal("submissions"); }} className="rounded-xl border px-5 py-2.5 text-sm font-bold">Cancel</button><button disabled={saveGrade.isPending} className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{saveGrade.isPending ? "Saving…" : "Save marks"}</button></div></form></Modal>}
  </div>;
}
