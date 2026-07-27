import api from "./axiosInstance";

export const adminApi = {
  list: async (resource: string) => (await api.get(`/admin/${resource}`)).data,
  create: async (resource: string, data: Record<string, unknown>) => (await api.post(`/admin/${resource}`, data)).data,
  update: async (resource: string, id: number, data: Record<string, unknown>) => (await api.patch(`/admin/${resource}/${id}`, data)).data,
  remove: async (resource: string, id: number) => (await api.delete(`/admin/${resource}/${id}`)).data,
  dashboard: async () => (await api.get("/admin/dashboard")).data,
  decide: async (id: number, status: "active" | "rejected") => (await api.patch(`/admin/approvals/${id}`, { status })).data
};
