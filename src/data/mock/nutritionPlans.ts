export type NutritionPlanStatus = "Active" | "Draft" | "Completed";

export interface NutritionFood {
  id: number; name: string; quantity: string; calories: number; protein: number; carbs: number; fats: number;
}
export interface NutritionMeal {
  id: number; mealName: string; time: string; notes: string; foods: NutritionFood[];
}
export interface NutritionPlan {
  id: number; name: string;
  clientId: number; clientName: string;
  trainerId: number; trainerName: string;
  goal: string; dailyCalories: number; protein: number; carbs: number; fats: number;
  durationWeeks: number; status: NutritionPlanStatus; meals: NutritionMeal[];
}

export const nutritionPlans: NutritionPlan[] = [
  { id:1,name:"Ananya - Weight Loss Plan",clientId:1,clientName:"Ananya Sharma",trainerId:1,trainerName:"Rahul Mehta",goal:"Weight Loss",dailyCalories:1800,protein:130,carbs:170,fats:55,durationWeeks:8,status:"Active",
    meals:[
      {id:1,mealName:"Breakfast",time:"08:00",notes:"High-protein breakfast.",foods:[{id:1,name:"Oats",quantity:"50g",calories:190,protein:6,carbs:32,fats:4},{id:2,name:"Greek Yogurt",quantity:"150g",calories:100,protein:15,carbs:6,fats:2},{id:3,name:"Banana",quantity:"1 medium",calories:105,protein:1,carbs:27,fats:0}]},
      {id:2,mealName:"Lunch",time:"13:30",notes:"Balanced meal with lean protein.",foods:[{id:4,name:"Grilled Chicken",quantity:"150g",calories:248,protein:46,carbs:0,fats:5},{id:5,name:"Brown Rice",quantity:"120g cooked",calories:135,protein:3,carbs:28,fats:1},{id:6,name:"Mixed Vegetables",quantity:"150g",calories:80,protein:4,carbs:14,fats:1}]},
      {id:3,mealName:"Dinner",time:"20:00",notes:"Moderate carbohydrate dinner.",foods:[{id:7,name:"Paneer",quantity:"100g",calories:265,protein:18,carbs:6,fats:20},{id:8,name:"Roti",quantity:"2",calories:160,protein:6,carbs:32,fats:2},{id:9,name:"Salad",quantity:"150g",calories:60,protein:2,carbs:12,fats:0}]}
    ]},
  { id:2,name:"Rohan - Muscle Gain Plan",clientId:2,clientName:"Rohan Kapoor",trainerId:2,trainerName:"Priya Singh",goal:"Muscle Gain",dailyCalories:2600,protein:180,carbs:300,fats:75,durationWeeks:12,status:"Active",
    meals:[
      {id:4,mealName:"Breakfast",time:"07:30",notes:"Calorie-dense breakfast.",foods:[{id:10,name:"Oatmeal",quantity:"80g",calories:300,protein:10,carbs:54,fats:6},{id:11,name:"Whole Eggs",quantity:"3",calories:234,protein:19,carbs:2,fats:16},{id:12,name:"Peanut Butter",quantity:"20g",calories:118,protein:5,carbs:4,fats:10}]},
      {id:5,mealName:"Lunch",time:"13:30",notes:"Large balanced meal.",foods:[{id:13,name:"Chicken Breast",quantity:"200g",calories:330,protein:62,carbs:0,fats:7},{id:14,name:"White Rice",quantity:"200g cooked",calories:260,protein:5,carbs:57,fats:1},{id:15,name:"Vegetables",quantity:"150g",calories:80,protein:4,carbs:14,fats:1}]},
      {id:6,mealName:"Dinner",time:"20:30",notes:"Protein-rich dinner.",foods:[{id:16,name:"Paneer",quantity:"150g",calories:398,protein:27,carbs:9,fats:30},{id:17,name:"Roti",quantity:"3",calories:240,protein:9,carbs:48,fats:3}]}
    ]},
  { id:3,name:"Neha - Beginner Fitness Plan",clientId:3,clientName:"Neha Verma",trainerId:1,trainerName:"Rahul Mehta",goal:"General Fitness",dailyCalories:2000,protein:110,carbs:240,fats:60,durationWeeks:6,status:"Active",
    meals:[
      {id:7,mealName:"Breakfast",time:"08:00",notes:"Simple balanced breakfast.",foods:[{id:18,name:"Poha",quantity:"1 bowl",calories:250,protein:6,carbs:40,fats:7},{id:19,name:"Boiled Egg",quantity:"2",calories:156,protein:13,carbs:1,fats:11}]},
      {id:8,mealName:"Lunch",time:"13:00",notes:"Balanced Indian meal.",foods:[{id:20,name:"Dal",quantity:"1 bowl",calories:180,protein:10,carbs:28,fats:3},{id:21,name:"Rice",quantity:"150g cooked",calories:195,protein:4,carbs:43,fats:0},{id:22,name:"Mixed Vegetables",quantity:"150g",calories:80,protein:4,carbs:14,fats:1}]},
      {id:9,mealName:"Dinner",time:"20:00",notes:"Light and balanced.",foods:[{id:23,name:"Paneer",quantity:"100g",calories:265,protein:18,carbs:6,fats:20},{id:24,name:"Roti",quantity:"2",calories:160,protein:6,carbs:32,fats:2}]}
    ]},
  { id:4,name:"Arjun - Strength Nutrition Plan",clientId:4,clientName:"Arjun Patel",trainerId:3,trainerName:"Amit Shah",goal:"Strength",dailyCalories:2800,protein:190,carbs:320,fats:80,durationWeeks:10,status:"Draft",
    meals:[
      {id:10,mealName:"Breakfast",time:"07:00",notes:"High-protein breakfast.",foods:[{id:25,name:"Eggs",quantity:"4",calories:312,protein:25,carbs:2,fats:21},{id:26,name:"Oats",quantity:"80g",calories:300,protein:10,carbs:54,fats:6}]},
      {id:11,mealName:"Lunch",time:"13:00",notes:"Protein and carbohydrate focused.",foods:[{id:27,name:"Chicken Breast",quantity:"200g",calories:330,protein:62,carbs:0,fats:7},{id:28,name:"Rice",quantity:"200g cooked",calories:260,protein:5,carbs:57,fats:1}]}
    ]},
  { id:5,name:"Kavya - Fat Loss Plan",clientId:5,clientName:"Kavya Nair",trainerId:2,trainerName:"Priya Singh",goal:"Weight Loss",dailyCalories:1700,protein:120,carbs:150,fats:50,durationWeeks:8,status:"Completed",
    meals:[
      {id:12,mealName:"Breakfast",time:"08:00",notes:"Protein-rich breakfast.",foods:[{id:29,name:"Greek Yogurt",quantity:"200g",calories:130,protein:20,carbs:8,fats:2},{id:30,name:"Berries",quantity:"100g",calories:50,protein:1,carbs:12,fats:0}]},
      {id:13,mealName:"Lunch",time:"13:00",notes:"Lean protein with vegetables.",foods:[{id:31,name:"Grilled Chicken",quantity:"150g",calories:248,protein:46,carbs:0,fats:5},{id:32,name:"Salad",quantity:"200g",calories:80,protein:3,carbs:16,fats:1}]},
      {id:14,mealName:"Dinner",time:"19:30",notes:"Light dinner.",foods:[{id:33,name:"Paneer",quantity:"100g",calories:265,protein:18,carbs:6,fats:20},{id:34,name:"Vegetable Soup",quantity:"1 bowl",calories:120,protein:4,carbs:18,fats:3}]}
    ]}
];