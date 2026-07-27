import api from "./axiosInstance";
import type { User } from "../types";

export const loginRequest = async (email: string, password: string) =>
  (await api.post<{ accessToken: string; user: User; awaitingApproval: boolean }>("/auth/login", { email, password })).data;
export const getMe = async () => (await api.get<{ user: User }>("/auth/me")).data.user;
export const getRegistrationCatalog = async () => (await api.get("/auth/registration-catalog")).data;
export const registerRequest = async (data: FormData) => (await api.post("/auth/register", data)).data;
