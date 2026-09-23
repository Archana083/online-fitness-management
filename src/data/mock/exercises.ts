export type ExerciseDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: ExerciseDifficulty;
  sets: number;
  reps: string;
  restSeconds: number;
  instructions: string;
}

export const exercises: Exercise[] = [
  { id: 1, name: "Barbell Back Squat", muscleGroup: "Legs", equipment: "Barbell", difficulty: "Intermediate", sets: 4, reps: "8-10", restSeconds: 90, instructions: "Brace your core, keep your chest lifted, squat under control, then drive through the floor to stand." },
  { id: 2, name: "Bench Press", muscleGroup: "Chest", equipment: "Barbell", difficulty: "Intermediate", sets: 4, reps: "8-12", restSeconds: 90, instructions: "Keep your shoulder blades retracted, lower the bar toward mid-chest, and press it upward with control." },
  { id: 3, name: "Lat Pulldown", muscleGroup: "Back", equipment: "Cable Machine", difficulty: "Beginner", sets: 3, reps: "10-12", restSeconds: 60, instructions: "Pull the bar toward your upper chest while keeping your torso stable and squeezing your back." },
  { id: 4, name: "Romanian Deadlift", muscleGroup: "Hamstrings", equipment: "Dumbbells", difficulty: "Intermediate", sets: 3, reps: "10-12", restSeconds: 90, instructions: "Hinge at the hips with a neutral spine, lower the weights along your legs, then drive the hips forward." },
  { id: 5, name: "Push-Up", muscleGroup: "Chest", equipment: "Bodyweight", difficulty: "Beginner", sets: 3, reps: "10-15", restSeconds: 60, instructions: "Keep your body in a straight line, lower your chest toward the floor, and press back up." },
  { id: 6, name: "Dumbbell Shoulder Press", muscleGroup: "Shoulders", equipment: "Dumbbells", difficulty: "Beginner", sets: 3, reps: "10-12", restSeconds: 60, instructions: "Press the dumbbells overhead without arching your lower back, then lower them slowly." },
  { id: 7, name: "Plank", muscleGroup: "Core", equipment: "Bodyweight", difficulty: "Beginner", sets: 3, reps: "30-60 sec", restSeconds: 45, instructions: "Brace your abdomen, squeeze your glutes, and maintain a straight line from shoulders to heels." },
  { id: 8, name: "Kettlebell Swing", muscleGroup: "Full Body", equipment: "Kettlebell", difficulty: "Advanced", sets: 4, reps: "12-15", restSeconds: 75, instructions: "Hinge at the hips and drive through them to swing the kettlebell, keeping the movement powerful and controlled." },
];
