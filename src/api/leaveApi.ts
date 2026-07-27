import api from "./axiosInstance";

export const leaveApi = {
  list: async (status = "") => (await api.get("/leave", { params: status ? { status } : {} })).data,
  create: async (data: Record<string, unknown>) => (await api.post("/leave", data)).data,
  decide: async (id: number, status: "approved" | "rejected") => (await api.patch(`/leave/${id}/status`, { status })).data,
  cancel: async (id: number) => (await api.delete(`/leave/${id}`)).data
};
