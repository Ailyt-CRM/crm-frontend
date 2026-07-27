import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Award, Plus, Trash2 } from "lucide-react";
import { learningApi } from "../../api/learningApi";
import Modal from "../../components/common/Modal";
import { useAuth } from "../../context/AuthContext";

export default function Results() {
  const { user } = useAuth();
  const canManage = user?.role === "admin" || user?.role === "teacher";
  const client = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const { data = [] } = useQuery({ queryKey: ["results"], queryFn: learningApi.results });
  const { data: students = [] } = useQuery({ queryKey: ["learning-students"], queryFn: learningApi.students, enabled: canManage });
  const create = useMutation({ mutationFn: () => learningApi.createResult(form), onSuccess: () => { client.invalidateQueries({ queryKey: ["results"] }); setOpen(false); } });
  const remove = useMutation({ mutationFn: learningApi.deleteResult, onSuccess: () => client.invalidateQueries({ queryKey: ["results"] }) });

  return <div>
    <div className="flex justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">Performance</p><h1 className="mt-1 text-3xl font-extrabold">Results</h1><p className="mt-2 text-sm text-slate-500">Exam scores, assignment marks, grades, and course performance.</p></div>{canManage && <button onClick={() => { setForm({}); setOpen(true); }} className="self-end rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"><Plus className="mr-2 inline h-4 w-4" />Add result</button>}</div>
    <div className="mt-7 overflow-hidden rounded-2xl bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead><tr className="border-b text-xs uppercase text-slate-400"><th className="p-5">Student</th><th className="p-5">Course</th><th className="p-5">Assessment</th><th className="p-5">Score</th><th className="p-5">Grade</th>{canManage && <th />}</tr></thead><tbody>{data.length === 0 ? <tr><td colSpan={6} className="p-12 text-center text-slate-500">No results found.</td></tr> : data.map((result: any) => <tr key={`${result.kind}-${result.id}`} className="border-b last:border-0"><td className="p-5 font-bold">{result.student.user.name}</td><td className="p-5">{result.course.name}</td><td className="p-5"><p>{result.examName}</p>{result.kind === "assignment" && <span className="mt-1 inline-block rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold uppercase text-violet-600">Assignment</span>}</td><td className="p-5"><b>{Number(result.marksObtained)}</b>{result.maxMarks != null && <> / {Number(result.maxMarks)}</>}</td><td className="p-5"><span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-700"><Award className="h-3.5 w-3.5" />{result.grade || (result.kind === "assignment" ? "Marked" : "—")}</span></td>{canManage && <td className="p-5">{result.kind === "exam" && <button onClick={() => confirm("Delete result?") && remove.mutate(result.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></button>}</td>}</tr>)}</tbody></table></div></div>
    {open && <Modal title="Add exam result" onClose={() => setOpen(false)}><form onSubmit={(e: FormEvent) => { e.preventDefault(); create.mutate(); }} className="grid gap-5 p-6 sm:grid-cols-2"><select required onChange={e => setForm({ ...form, studentId: e.target.value })} className="rounded-xl border px-3 py-3 sm:col-span-2"><option value="">Select student</option>{students.map((s: any) => <option key={s.id} value={s.id}>{s.user.name} · {s.course.name} · {s.batch?.name}</option>)}</select><input placeholder="Exam name" required onChange={e => setForm({ ...form, examName: e.target.value })} className="rounded-xl border px-3 py-3 sm:col-span-2" /><input type="number" min="0" step="0.01" placeholder="Marks obtained" required onChange={e => setForm({ ...form, marksObtained: e.target.value })} className="rounded-xl border px-3 py-3" /><input type="number" min="1" step="0.01" placeholder="Maximum marks" required onChange={e => setForm({ ...form, maxMarks: e.target.value })} className="rounded-xl border px-3 py-3" /><input placeholder="Grade (optional)" onChange={e => setForm({ ...form, grade: e.target.value })} className="rounded-xl border px-3 py-3 sm:col-span-2" /><button className="rounded-xl bg-blue-600 py-3 font-bold text-white sm:col-span-2">Save result</button></form></Modal>}
  </div>;
}
