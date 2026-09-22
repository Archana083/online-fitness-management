export type ClientStatus = "Active" | "Inactive" | "Pending";

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  trainer: string;
  plan: string;
  goal: string;
  joinedDate: string;
  status: ClientStatus;
}

export const clients: Client[] = [
  { id: 1, name: "Ananya Sharma", email: "ananya@example.com", phone: "+91 98765 43210", trainer: "Rahul Mehta", plan: "Premium", goal: "Weight Loss", joinedDate: "2026-08-12", status: "Active" },
  { id: 2, name: "Rohan Kapoor", email: "rohan@example.com", phone: "+91 98765 12345", trainer: "Priya Singh", plan: "Pro", goal: "Muscle Gain", joinedDate: "2026-08-20", status: "Active" },
  { id: 3, name: "Neha Verma", email: "neha@example.com", phone: "+91 91234 56789", trainer: "Rahul Mehta", plan: "Basic", goal: "General Fitness", joinedDate: "2026-09-02", status: "Pending" },
  { id: 4, name: "Arjun Patel", email: "arjun@example.com", phone: "+91 99887 66554", trainer: "Amit Shah", plan: "Premium", goal: "Strength", joinedDate: "2026-07-18", status: "Active" },
  { id: 5, name: "Kavya Nair", email: "kavya@example.com", phone: "+91 90909 80808", trainer: "Priya Singh", plan: "Pro", goal: "Weight Loss", joinedDate: "2026-06-28", status: "Inactive" },
];