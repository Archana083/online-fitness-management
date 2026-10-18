import { api } from './api'
import type{ Client } from '@/data/mock/clients'

export const getClients = async () => {
  try {
    const response = await api.get('/clients/')
  
    return response.data
  } catch (error) {
    console.error('Error fetching clients:', error)
    throw error
  }
}

export const createClient = async (clientData: Client) => {
    try{
        const response = await api.post('/clients/', clientData)
        return response.data
    }
    catch(error){
        console.error('Error creating client:', error)
        throw error
    }
}
export const updateClient = async (clientId: number, clientData: Client) => {
    try{
        const response = await api.put(`/clients/${clientId}/`, clientData)
        return response.data
    }
    catch(error){
        console.error('Error updating client:', error)
        throw error
    }
}

export const patchClient = async (clientId: number, clientData: Partial<Client>) => {
  try {
    const response = await api.patch(`/clients/${clientId}/`, clientData)
    return response.data
  } catch (error) {
    console.error('Error updating client:', error)
    throw error
  }
}

export const deleteClient = async (clientId: number) => {
    try{
        const response = await api.delete(`/clients/${clientId}/`)
        return response.data
    }
    catch(error){
        console.error('Error deleting client:', error)
        throw error
    }
}
