export type Role = "admin" | "teacher" | "employee" | "student";
export type UserStatus = "active" | "pending" | "rejected" | "inactive";
export interface User { id: number; name: string; email: string; phone: string; role: Role; status: UserStatus; profilePhotoUrl?: string | null; }
