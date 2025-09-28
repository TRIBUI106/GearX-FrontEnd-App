import { userRegister, userFetchData, updateUser } from "@/api/userApi"
import { checkValidPhoneNumber } from "@/lib/utils"
import type { User } from "@/models/User"
import { defineStore } from "pinia"
import { toast } from "vue-sonner"

export const useUserStore = defineStore("user", () => {

    const registerNewUser = async (user: any) => {
      const res = await userRegister(user)
      return res
    }

    const fetchUserData = async (username: string) => {
        const res = await userFetchData(username)
        return res
    }

    const updateUserData = async (userId: number, user: User) => {
        // console.log(userId)
        // console.log('=====================')
        // console.log(user)

        user.updatedBy = user.email

        if ( user.fullName.length < 5 ) {
            toast.error("Tên phải dài hơn 5 kí tự !")
        }

        if ( !checkValidPhoneNumber(user.phone) || !user.phone.startsWith("0") ) {
            toast.error("Số điện thoại phải là 1 dãy 10 số bắt đầu từ 0")
            return
        }


        console.log("tiep tuc")
        // const res = await updateUser(userId, user)

    }


    // Return function to call
    return {
        registerNewUser,
        fetchUserData,
        updateUserData
    }

})