<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { Plus, Trash2, X } from "lucide-vue-next";
import { clients } from "@/data/mock/clients";
import { trainers } from "@/data/mock/trainers";
import type { NutritionPlan, NutritionMeal, NutritionFood } from "@/data/mock/nutritionPlans";

const props=withDefaults(defineProps<{isOpen:boolean; plan?:NutritionPlan|null}>(),{plan:null});
const emit=defineEmits<{close:[];save:[plan:NutritionPlan]}>();
const blank=():NutritionPlan=>({id:Date.now(),name:"",clientId:1,clientName:clients[0]?.name||"",trainerId:1,trainerName:trainers[0]?.name||"",goal:"Weight Loss",dailyCalories:1800,protein:120,carbs:180,fats:55,durationWeeks:8,status:"Draft",meals:[]});
const form=reactive<NutritionPlan>(blank());
const editing=computed(()=>!!props.plan);

watch(()=>props.plan,(p)=>{Object.assign(form,structuredClone(p??blank()));},{immediate:true});
const syncClient=()=>{form.clientName=clients.find(c=>c.id===form.clientId)?.name??""};
const syncTrainer=()=>{form.trainerName=trainers.find(t=>t.id===form.trainerId)?.name??""};
const addMeal=()=>form.meals.push({id:Date.now(),mealName:"New Meal",time:"12:00",notes:"",foods:[]});
const removeMeal=(id:number)=>form.meals=form.meals.filter(m=>m.id!==id);
const addFood=(meal:NutritionMeal)=>meal.foods.push({id:Date.now(),name:"",quantity:"",calories:0,protein:0,carbs:0,fats:0});
const removeFood=(meal:NutritionMeal,id:number)=>meal.foods=meal.foods.filter(f=>f.id!==id);
const mealTotal=(meal:NutritionMeal,key:keyof Pick<NutritionFood,"calories"|"protein"|"carbs"|"fats">)=>meal.foods.reduce((s,f)=>s+Number(f[key]||0),0);
const save=()=>{if(!form.name.trim()||!form.clientId||!form.trainerId||form.dailyCalories<=0||form.durationWeeks<=0)return; emit("save",structuredClone(form));};
</script>
<template>
<Teleport to="body"><div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" @click.self="emit('close')">
<div class="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
<div class="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800"><div><h2 class="text-lg font-bold">{{ editing ? "Edit Nutrition Plan" : "Create Nutrition Plan" }}</h2><p class="text-xs text-slate-400">Build the plan and its meal schedule.</p></div><button class="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800" @click="emit('close')"><X :size="18"/></button></div>
<div class="overflow-y-auto p-6 space-y-6">
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
<div class="lg:col-span-2"><label class="label">Plan Name</label><input v-model="form.name" class="input" placeholder="e.g. Ananya - Weight Loss Plan"/></div>
<div><label class="label">Client</label><select v-model.number="form.clientId" class="input" @change="syncClient"><option v-for="c in clients" :key="c.id" :value="c.id">{{c.name}}</option></select></div>
<div><label class="label">Trainer</label><select v-model.number="form.trainerId" class="input" @change="syncTrainer"><option v-for="t in trainers" :key="t.id" :value="t.id">{{t.name}}</option></select></div>
<div><div class="label">Goal</div><input v-model="form.goal" class="input" placeholder="Weight Loss"/></div>
<div><div class="label">Duration (weeks)</div><input v-model.number="form.durationWeeks" type="number" min="1" class="input"/></div>
<div><div class="label">Status</div><select v-model="form.status" class="input"><option>Active</option><option>Draft</option><option>Completed</option></select></div>
<div><div class="label">Daily Calories</div><input v-model.number="form.dailyCalories" type="number" min="1" class="input"/></div>
<div><div class="label">Protein (g)</div><input v-model.number="form.protein" type="number" min="0" class="input"/></div>
<div><div class="label">Carbs (g)</div><input v-model.number="form.carbs" type="number" min="0" class="input"/></div>
<div><div class="label">Fats (g)</div><input v-model.number="form.fats" type="number" min="0" class="input"/></div>
</div>
<div class="flex items-center justify-between"><div><h3 class="font-semibold">Meals</h3><p class="text-xs text-slate-400">Add foods and nutrition values per meal.</p></div><button class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900" @click="addMeal"><Plus :size="16"/>Add Meal</button></div>
<div v-if="!form.meals.length" class="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400 dark:border-slate-700">No meals added yet.</div>
<div v-for="meal in form.meals" :key="meal.id" class="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
<div class="grid gap-3 md:grid-cols-[1fr_140px_auto]"><input v-model="meal.mealName" class="input" placeholder="Meal name"/><input v-model="meal.time" type="time" class="input"/><button class="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" @click="removeMeal(meal.id)"><Trash2 :size="17"/></button></div>
<input v-model="meal.notes" class="input mt-3" placeholder="Meal notes"/>
<div class="mt-4 overflow-x-auto"><table class="w-full min-w-[700px] text-sm"><thead class="text-[10px] uppercase tracking-wider text-slate-400"><tr><th class="px-2 py-2 text-left">Food</th><th class="px-2 py-2 text-left">Quantity</th><th class="px-2 py-2">Calories</th><th class="px-2 py-2">Protein</th><th class="px-2 py-2">Carbs</th><th class="px-2 py-2">Fats</th><th/></tr></thead><tbody>
<tr v-for="food in meal.foods" :key="food.id" class="border-t border-slate-100 dark:border-slate-800"><td class="p-2"><input v-model="food.name" class="input"/></td><td class="p-2"><input v-model="food.quantity" class="input"/></td><td class="p-2"><input v-model.number="food.calories" type="number" min="0" class="input"/></td><td class="p-2"><input v-model.number="food.protein" type="number" min="0" class="input"/></td><td class="p-2"><input v-model.number="food.carbs" type="number" min="0" class="input"/></td><td class="p-2"><input v-model.number="food.fats" type="number" min="0" class="input"/></td><td class="p-2"><button class="text-slate-400 hover:text-red-600" @click="removeFood(meal,food.id)"><Trash2 :size="16"/></button></td></tr>
</tbody></table></div>
<button class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" @click="addFood(meal)"><Plus :size="14"/>Add Food</button>
<div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-500"><span class="rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">Meal: {{mealTotal(meal,"calories")}} kcal</span><span class="rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">P {{mealTotal(meal,"protein")}}g</span><span class="rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">C {{mealTotal(meal,"carbs")}}g</span><span class="rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">F {{mealTotal(meal,"fats")}}g</span></div>
</div>
</div>
<div class="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-800"><button class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800" @click="emit('close')">Cancel</button><button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900" @click="save">{{editing?"Save Changes":"Create Plan"}}</button></div>
</div></div></Teleport>
</template>
<style scoped>
.label{display:block;margin-bottom:.375rem;font-size:.75rem;font-weight:600;color:#64748b}
.input{width:100%;border:1px solid #e2e8f0;background:#f8fafc;border-radius:.75rem;padding:.625rem .75rem;font-size:.875rem;outline:none}
.input:focus{border-color:#94a3b8;box-shadow:0 0 0 3px rgb(148 163 184 / .15)}
:global(.dark) .input{border-color:#334155;background:#1e293b;color:#f8fafc}
</style>