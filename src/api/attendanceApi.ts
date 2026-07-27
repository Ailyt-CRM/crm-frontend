import api from "./axiosInstance";

export const attendanceApi = {
  batches: async () => (await api.get("/attendance/batches")).data.data,
  roster: async (batchId: number, date: string) => (await api.get(`/attendance/batches/${batchId}`, { params: { date } })).data,
  markBatch: async (batchId: number, date: string, records: { userId: number; status: string }[]) => (await api.put(`/attendance/batches/${batchId}`, { date, records })).data,
  mine: async (year: number, month: number) => (await api.get("/attendance/me", { params: { year, month } })).data,
  markMine: async (status: "present" | "leave") => (await api.post("/attendance/me", { status })).data
};
