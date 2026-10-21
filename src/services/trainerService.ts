import type { Trainer } from "@/data/mock/trainers";
import { api } from "./api";

export async function getTrainers() {
  try {
    const response = await api.get("/trainers/");
    return response.data;
  } catch (error) {
    console.error("Error fetching trainers:", error);
    throw error;
  }
}

export async function updateTrainer(trainerId:number, trainerData: Trainer){
    try{
        const response = await api.put(`/trainers/${trainerId}/`, trainerData);
        return response.data
           
    } catch(error)
    {
     console.error("Error updating trainer", error)
     throw error;
    }
}

export const createTrainer = async (trainerData : Trainer) =>{
  try{
    const response = await api.post("/trainers/", trainerData);
    return response.data
  }
  catch(error)
  {
   console.error(error, "trouble in creating trainer")
   throw error
  }
}