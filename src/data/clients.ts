export type ClientStatus = "active" | "inactive" | "pending";

export interface Client {
  id: number
  name: string
  email: string
  phone: string
  trainer: number
  plan: 'basic' | 'pro' | 'premium'
  goal: 'weight_loss' | 'muscle_gain' | 'strength' | 'general_fitness'
  joinedDate: string
  status: ClientStatus
}

