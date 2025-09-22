import { userRegister, userFetchData } from "@/api/userApi"
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", () => {

    const registerNewUser = async (user: any) => {
      const res = await userRegister(user)
      return res
    }

    const fetchUserData = async (username: string) => {
        const res = await userFetchData(username)
        return res
    }
    
    return {
        registerNewUser,
        fetchUserData
    }

})