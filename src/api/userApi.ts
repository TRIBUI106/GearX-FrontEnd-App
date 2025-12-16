import { apiService } from "./axiosConfig";

export const userFetchData = async (username: string) => {
    return await apiService.get(`user/fetch?username=${username}`)
}

export const userRegister = async (user : any) => {
    return await apiService.post("user/register", user)
}

export const updateUser = async (userId : number, user : any) => {
    return await apiService.put(`user/update?userId=${userId}`, user)
}
