import { apiService } from "./axiosConfig";
import type { AuthApiResponse } from "@/models/ApiResponse";
import type { User } from "@/models/User";

export const userFetchData = async (username: string) => {
    return await apiService.get(`user/fetch?username=${username}`)
}

export const userRegister = async (user : any) => {
    return await apiService.post("user/register", user)
}

export const updateUser = async (user : any, userId : number) => {
    return await apiService.post(`user/update?userId=${userId}`, user)
}
