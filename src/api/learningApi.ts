import api from "./axiosInstance";

async function downloadBlob(endpoint: string, fallbackFilename: string) {
  const response = await api.get(endpoint, { responseType: "blob" });
  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  const disposition = response.headers["content-disposition"] || "";
  const encodedFilename = disposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  link.href = url;
  link.download = encodedFilename ? decodeURIComponent(encodedFilename) : fallbackFilename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const learningApi = {
  batches: async () => (await api.get("/learning/batches")).data.data,
  students: async () => (await api.get("/learning/students")).data.data,
  materials: async () => (await api.get("/learning/materials")).data.data,
  uploadMaterial: async (data: FormData) => (await api.post("/learning/materials", data)).data,
  downloadMaterial: async (id: number) => downloadBlob(`/learning/materials/${id}/download`, "study-material"),
  deleteMaterial: async (id: number) => (await api.delete(`/learning/materials/${id}`)).data,
  assignments: async () => (await api.get("/learning/assignments")).data.data,
  createAssignment: async (data: Record<string, unknown>) => (await api.post("/learning/assignments", data)).data,
  deleteAssignment: async (id: number) => (await api.delete(`/learning/assignments/${id}`)).data,
  submit: async (id: number, data: FormData) => (await api.post(`/learning/assignments/${id}/submit`, data)).data,
  submissions: async (id: number) => (await api.get(`/learning/assignments/${id}/submissions`)).data.data,
  downloadSubmission: async (id: number) => downloadBlob(`/learning/submissions/${id}/download`, "assignment-submission.pdf"),
  grade: async (id: number, marksObtained: number) => (await api.patch(`/learning/submissions/${id}/grade`, { marksObtained })).data,
  results: async () => (await api.get("/learning/results")).data.data,
  createResult: async (data: Record<string, unknown>) => (await api.post("/learning/results", data)).data,
  deleteResult: async (id: number) => (await api.delete(`/learning/results/${id}`)).data
};
