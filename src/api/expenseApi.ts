import api from "./axiosInstance";

export const expenseApi = {
  list: async (filters: Record<string, string>) => (await api.get("/expenses", { params: filters })).data,
  create: async (data: Record<string, unknown>) => (await api.post("/expenses", data)).data,
  update: async (id: number, data: Record<string, unknown>) => (await api.patch(`/expenses/${id}`, data)).data,
  remove: async (id: number) => (await api.delete(`/expenses/${id}`)).data
};
