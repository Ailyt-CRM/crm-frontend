import api from "./axiosInstance";

export const salaryApi = {
  list: async () => (await api.get("/salary")).data.data,
  staff: async () => (await api.get("/salary/staff")).data.data,
  create: async (data: Record<string, unknown>) => (await api.post("/salary", data)).data,
  update: async (id: number, data: Record<string, unknown>) => (await api.patch(`/salary/${id}`, data)).data,
  remove: async (id: number) => (await api.delete(`/salary/${id}`)).data,
  downloadSlip: async (id: number, filename: string) => {
    const response = await api.get(`/salary/${id}/slip`, { responseType: "blob" });
    const url = URL.createObjectURL(response.data); const link = document.createElement("a");
    link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
  }
};
