import api from "./axiosInstance";

export const reportApi = {
  analytics: async () => (await api.get("/reports/analytics")).data
};
