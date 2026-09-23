import type { Exercise } from "@/data/mock/exercises";

export interface WorkoutExercise {
  id: number;
  exerciseId: number;
  day: string;
  sets: number;
  reps: string;
  weight: number;
  restSeconds: number;
  notes: string;
}

export interface WorkoutPlan {
  id: number;
  name: string;
  clientId: number;
  clientName: string;
  programId: number;
  programName: string;
  trainerName: string;
  durationWeeks: number;
  status: "Active" | "Draft" | "Completed";
  exercises: WorkoutExercise[];
}

export const workoutPlans: WorkoutPlan[] = [
  {
    id: 1, name: "Ananya - Fat Loss Phase 1", clientId: 1, clientName: "Ananya Sharma",
    programId: 1, programName: "Fat Loss Foundation", trainerName: "Rahul Mehta",
    durationWeeks: 8, status: "Active",
    exercises: [
      { id: 101, exerciseId: 1, day: "Monday", sets: 4, reps: "10", weight: 35, restSeconds: 90, notes: "Controlled tempo" },
      { id: 102, exerciseId: 3, day: "Monday", sets: 3, reps: "12", weight: 25, restSeconds: 60, notes: "" },
      { id: 103, exerciseId: 7, day: "Monday", sets: 3, reps: "45 sec", weight: 0, restSeconds: 45, notes: "Keep core braced" },
      { id: 104, exerciseId: 5, day: "Wednesday", sets: 3, reps: "12", weight: 0, restSeconds: 60, notes: "" },
    ],
  },
  {
    id: 2, name: "Rohan - Strength Block", clientId: 2, clientName: "Rohan Kapoor",
    programId: 2, programName: "Strength Builder", trainerName: "Priya Singh",
    durationWeeks: 12, status: "Active",
    exercises: [
      { id: 201, exerciseId: 2, day: "Monday", sets: 4, reps: "8", weight: 60, restSeconds: 120, notes: "Progressive overload" },
      { id: 202, exerciseId: 1, day: "Wednesday", sets: 4, reps: "8", weight: 70, restSeconds: 120, notes: "" },
    ],
  },
  {
    id: 3, name: "Neha - Starter Plan", clientId: 3, clientName: "Neha Verma",
    programId: 3, programName: "Functional Fitness", trainerName: "Rahul Mehta",
    durationWeeks: 10, status: "Draft", exercises: [],
  },
];

export const workoutPlanExercises: Exercise[] = [];
