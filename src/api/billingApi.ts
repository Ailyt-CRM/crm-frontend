import api from "./axiosInstance";

export const billingApi = {
  services: async () => (await api.get("/billing/services")).data.data,
  createService: async (data: Record<string, unknown>) => (await api.post("/billing/services", data)).data,
  updateService: async (id: number, data: Record<string, unknown>) => (await api.patch(`/billing/services/${id}`, data)).data,
  deleteService: async (id: number) => (await api.delete(`/billing/services/${id}`)).data,
  employees: async () => (await api.get("/billing/employees")).data.data,
  orders: async () => (await api.get("/billing/orders")).data.data,
  createOrder: async (data: Record<string, unknown>) => (await api.post("/billing/orders", data)).data,
  deleteOrder: async (id: number) => (await api.delete(`/billing/orders/${id}`)).data,
  downloadInvoice: async (id: number, invoiceNo: string) => {
    const response = await api.get(`/billing/orders/${id}/invoice`, { responseType: "blob" });
    const url = URL.createObjectURL(response.data); const link = document.createElement("a");
    link.href = url; link.download = `${invoiceNo}.pdf`; document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
};
