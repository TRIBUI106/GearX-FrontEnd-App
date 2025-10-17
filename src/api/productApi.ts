import { apiService } from "./axiosConfig";

export const getUserData = async (username: string) => {
    return await apiService.get(`user/fetch?username=${username}`)
}
