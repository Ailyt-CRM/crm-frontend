import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, FileText, Trash2, Upload } from "lucide-react";
import { learningApi } from "../../api/learningApi";
import Modal from "../../components/common/Modal";
import { useAuth } from "../../context/AuthContext";

export default function Materials() {
  const { user } = useAuth();
  const canManage = user?.role === "admin" || user?.role === "teacher";
  const client = useQueryClient();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [batchId, setBatchId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { data = [], isLoading } = useQuery({ queryKey: ["materials"], queryFn: learningApi.materials });
  const { data: batches = [] } = useQuery({ queryKey: ["learning-batches"], queryFn: learningApi.batches });
  const upload = useMutation({
    mutationFn: () => {
      const body = new FormData();
      body.append("title", title);
      body.append("batchId", batchId);
      if (file) body.append("file", file);
      return learningApi.uploadMaterial(body);
    },
    onSuccess: () => { client.invalidateQueries({ queryKey: ["materials"] }); setOpen(false); }
  });
  const remove = useMutation({ mutationFn: learningApi.deleteMaterial, onSuccess: () => client.invalidateQueries({ queryKey: ["materials"] }) });

  return <div>
    <div className="flex justify-between gap-4">
      <div><p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">Learning resources</p><h1 className="mt-1 text-3xl font-extrabold">Study materials</h1><p className="mt-2 text-sm text-slate-500">Notes, presentations, and resources for your batches.</p></div>
      {canManage && <button onClick={() => setOpen(true)} className="self-end rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"><Upload className="mr-2 inline h-4 w-4" />Upload</button>}
    </div>
    <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {isLoading ? <p>Loading…</p> : data.length === 0 ? <p className="text-slate-500">No study materials yet.</p> : data.map((item: any) =>
        <article key={item.id} className="rounded-2xl bg-white p-5 shadow-sm">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50"><FileText className="h-5 w-5 text-blue-600" /></span>
          <h2 className="mt-4 font-bold">{item.title}</h2>
          <p className="mt-1 text-xs text-slate-500">{item.batch.course.name} · {item.batch.name}</p>
          <p className="mt-3 text-xs text-slate-400">Uploaded by {item.uploader.name}</p>
          <div className="mt-5 flex gap-2">
            <button type="button" onClick={() => learningApi.downloadMaterial(item.id)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700"><Download className="h-3.5 w-3.5" />Download file</button>
            {canManage && <button onClick={() => confirm("Delete this material?") && remove.mutate(item.id)} className="rounded-lg border border-red-100 p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>}
          </div>
        </article>)}
    </div>
    {open && <Modal title="Upload study material" onClose={() => setOpen(false)}>
      <form onSubmit={(e: FormEvent) => { e.preventDefault(); upload.mutate(); }} className="space-y-5 p-6">
        <label className="block text-sm font-semibold">Title<input value={title} onChange={e => setTitle(e.target.value)} required className="mt-2 w-full rounded-xl border px-3 py-3 font-normal" /></label>
        <label className="block text-sm font-semibold">Batch<select value={batchId} onChange={e => setBatchId(e.target.value)} required className="mt-2 w-full rounded-xl border px-3 py-3 font-normal"><option value="">Select batch</option>{batches.map((batch: any) => <option key={batch.id} value={batch.id}>{batch.course.name} · {batch.name}</option>)}</select></label>
        <label className="block text-sm font-semibold">File<input type="file" onChange={e => setFile(e.target.files?.[0] || null)} required className="mt-2 block w-full rounded-xl border p-3 font-normal" /></label>
        {upload.isError && <p className="text-sm text-red-600">Upload failed. Check Cloudinary configuration and file type.</p>}
        <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white">Upload material</button>
      </form>
    </Modal>}
  </div>;
}
