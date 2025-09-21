import axios, { type AxiosResponse } from "axios"
import { BASE_URL } from "@/lib/config"

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
})

export const apiService = {
  get: async <T>(url: string): Promise<T> => {
    const res: AxiosResponse<T> = await api.get(url)
    return res.data
  },
  post: async <T>(url: string, data?: any): Promise<T> => {
    const res: AxiosResponse<T> = await api.post(url, data)
    return res.data
  },
  put: async <T>(url: string, data?: any): Promise<T> => {
    const res: AxiosResponse<T> = await api.put(url, data)
    return res.data
  },
  delete: async <T>(url: string, data?: any): Promise<T> => {
    const res: AxiosResponse<T> = await api.delete(url, { data })
    return res.data
  },
}
