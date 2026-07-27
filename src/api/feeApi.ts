import api from "./axiosInstance";

export const feeApi = {
  list: async () => (await api.get("/fees")).data.data,
  create: async (data: Record<string, unknown>) => (await api.post("/fees", data)).data,
  update: async (id: number, data: Record<string, unknown>) => (await api.patch(`/fees/${id}`, data)).data,
  remove: async (id: number) => (await api.delete(`/fees/${id}`)).data,
  pay: async (id: number, data: Record<string, unknown>) => (await api.post(`/fees/${id}/payments`, data)).data,
  removePayment: async (id: number) => (await api.delete(`/fees/payments/${id}`)).data,
  downloadReceipt: async (id: number, receiptNo: string) => {
    const response = await api.get(`/fees/payments/${id}/receipt`, { responseType: "blob" });
    const url = URL.createObjectURL(response.data); const link = document.createElement("a");
    link.href = url; link.download = `${receiptNo}.pdf`; link.click(); URL.revokeObjectURL(url);
  }
};
