export type SessionStatus = "Scheduled" | "Completed" | "Cancelled" | "No Show";

export type SessionType =
  | "Personal Training"
  | "Workout Review"
  | "Nutrition Consultation"
  | "Progress Check-in"
  | "Online Training";

export type SessionLocation = "Gym" | "Online" | "Client Home";

export interface Session {
  id: number;

  clientId: number;
  clientName: string;

  trainerId: number;
  trainerName: string;

  date: string;
  startTime: string;
  endTime: string;

  type: SessionType;
  location: SessionLocation;

  status: SessionStatus;

  notes: string;
  meetingLink: string;
}

export const sessions: Session[] = [
  {
    id: 1,
    clientId: 1,
    clientName: "Ananya Sharma",
    trainerId: 1,
    trainerName: "Rahul Mehta",

    date: "2026-09-24",
    startTime: "07:00",
    endTime: "08:00",

    type: "Personal Training",
    location: "Gym",

    status: "Scheduled",

    notes: "Lower body strength session.",
    meetingLink: "",
  },

  {
    id: 2,
    clientId: 2,
    clientName: "Rohan Kapoor",
    trainerId: 2,
    trainerName: "Priya Singh",

    date: "2026-09-24",
    startTime: "10:00",
    endTime: "11:00",

    type: "Workout Review",
    location: "Online",

    status: "Scheduled",

    notes: "Review current strength block.",
    meetingLink: "https://meet.example.com/rohan-review",
  },

  {
    id: 3,
    clientId: 3,
    clientName: "Neha Verma",
    trainerId: 1,
    trainerName: "Rahul Mehta",

    date: "2026-09-23",
    startTime: "17:00",
    endTime: "17:45",

    type: "Nutrition Consultation",
    location: "Online",

    status: "Completed",

    notes: "Reviewed beginner nutrition plan.",
    meetingLink: "https://meet.example.com/neha-nutrition",
  },

  {
    id: 4,
    clientId: 4,
    clientName: "Arjun Patel",
    trainerId: 3,
    trainerName: "Amit Shah",

    date: "2026-09-25",
    startTime: "18:00",
    endTime: "19:00",

    type: "Personal Training",
    location: "Gym",

    status: "Scheduled",

    notes: "Strength-focused training.",
    meetingLink: "",
  },

  {
    id: 5,
    clientId: 5,
    clientName: "Kavya Nair",
    trainerId: 2,
    trainerName: "Priya Singh",

    date: "2026-09-22",
    startTime: "09:00",
    endTime: "10:00",

    type: "Progress Check-in",
    location: "Client Home",

    status: "No Show",

    notes: "Client did not attend.",
    meetingLink: "",
  },

  {
    id: 6,
    clientId: 1,
    clientName: "Ananya Sharma",
    trainerId: 1,
    trainerName: "Rahul Mehta",

    date: "2026-09-20",
    startTime: "07:00",
    endTime: "08:00",

    type: "Personal Training",
    location: "Gym",

    status: "Completed",

    notes: "Full body training completed.",
    meetingLink: "",
  },

  {
    id: 7,
    clientId: 2,
    clientName: "Rohan Kapoor",
    trainerId: 2,
    trainerName: "Priya Singh",

    date: "2026-09-26",
    startTime: "16:00",
    endTime: "17:00",

    type: "Online Training",
    location: "Online",

    status: "Scheduled",

    notes: "Live online training session.",
    meetingLink: "https://meet.example.com/rohan-training",
  },
];
