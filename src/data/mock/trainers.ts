export type TrainerStatus = "Active" | "Inactive";

export interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  clients: number;
  joinedDate: string;
  status: TrainerStatus;
  bio: string;
}

export const trainers: Trainer[] = [
  {
    id: 1,
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    phone: "+91 98765 11001",
    specialization: "Strength & Conditioning",
    experience: 7,
    clients: 24,
    joinedDate: "2023-02-15",
    status: "Active",
    bio: "Strength and conditioning coach focused on progressive training, mobility, and sustainable performance.",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 98765 11002",
    specialization: "Weight Loss & Nutrition",
    experience: 5,
    clients: 18,
    joinedDate: "2024-01-10",
    status: "Active",
    bio: "Fitness coach specializing in practical fat-loss programs, habit building, and nutrition guidance.",
  },
  {
    id: 3,
    name: "Amit Shah",
    email: "amit.shah@example.com",
    phone: "+91 98765 11003",
    specialization: "Functional Training",
    experience: 6,
    clients: 21,
    joinedDate: "2023-08-21",
    status: "Active",
    bio: "Functional training specialist helping clients improve strength, movement quality, and everyday fitness.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    phone: "+91 98765 11004",
    specialization: "Yoga & Mobility",
    experience: 4,
    clients: 12,
    joinedDate: "2024-06-05",
    status: "Inactive",
    bio: "Yoga and mobility coach focused on flexibility, recovery, posture, and mindful movement.",
  },
];
