import { api } from "./api";

export async function getTrainers() {
    try{
        const response = await api.get('/trainers/')    
        return response.data;
    }
    catch(error)
    {
        console.error('Error fetching trainers:', error)
        throw error
    }
}