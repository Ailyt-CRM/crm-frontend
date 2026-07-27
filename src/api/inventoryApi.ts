import api from "./axiosInstance";

export const inventoryApi = {
  items: async () => (await api.get("/inventory")).data.data,
  createItem: async (data: Record<string, unknown>) => (await api.post("/inventory", data)).data,
  updateItem: async (id: number, data: Record<string, unknown>) => (await api.patch(`/inventory/${id}`, data)).data,
  deleteItem: async (id: number) => (await api.delete(`/inventory/${id}`)).data,
  suppliers: async () => (await api.get("/inventory/suppliers")).data.data,
  createSupplier: async (data: Record<string, unknown>) => (await api.post("/inventory/suppliers", data)).data,
  updateSupplier: async (id: number, data: Record<string, unknown>) => (await api.patch(`/inventory/suppliers/${id}`, data)).data,
  deleteSupplier: async (id: number) => (await api.delete(`/inventory/suppliers/${id}`)).data,
  transactions: async () => (await api.get("/inventory/stock-transactions")).data.data,
  createTransaction: async (data: Record<string, unknown>) => (await api.post("/inventory/stock-transactions", data)).data
};
