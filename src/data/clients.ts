export type ClientStatus = "active" | "inactive" | "pending";
export type ClientPlan = "basic" | "pro" | "premium";
export type ClientGoal =
  | "weight_loss"
  | "muscle_gain"
  | "strength"
  | "general_fitness";
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  trainer: number;
  plan: ClientPlan;
  goal: ClientGoal;
  joinedDate: string;
  status: ClientStatus;
}
export type ClientForm = Omit<Client, "id" | "plan" | "goal"> & {
  plan: ClientPlan | "";
  goal: ClientGoal | "";
};