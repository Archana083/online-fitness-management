export type ProgramStatus = "Active" | "Draft" | "Archived";
export type ProgramLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Program {
  id: number;
  name: string;
  category: string;
  level: ProgramLevel;
  durationWeeks: number;
  sessionsPerWeek: number;
  price: number;
  clients: number;
  status: ProgramStatus;
  description: string;
}

export const programs: Program[] = [
  { id: 1, name: "Fat Loss Foundation", category: "Weight Loss", level: "Beginner", durationWeeks: 8, sessionsPerWeek: 4, price: 4999, clients: 32, status: "Active", description: "A structured beginner-friendly program combining strength, cardio, and sustainable habits." },
  { id: 2, name: "Strength Builder", category: "Strength", level: "Intermediate", durationWeeks: 12, sessionsPerWeek: 5, price: 6999, clients: 24, status: "Active", description: "Progressive resistance training designed to build strength and lean muscle." },
  { id: 3, name: "Functional Fitness", category: "Functional", level: "Intermediate", durationWeeks: 10, sessionsPerWeek: 4, price: 5999, clients: 19, status: "Active", description: "Full-body functional workouts focused on movement quality, stability, and conditioning." },
  { id: 4, name: "Mobility Reset", category: "Mobility", level: "Beginner", durationWeeks: 6, sessionsPerWeek: 3, price: 3499, clients: 11, status: "Draft", description: "A mobility-focused program for flexibility, posture, recovery, and better movement." },
  { id: 5, name: "Athletic Performance", category: "Performance", level: "Advanced", durationWeeks: 12, sessionsPerWeek: 6, price: 8999, clients: 8, status: "Archived", description: "Advanced conditioning and strength programming for performance-focused clients." },
];
