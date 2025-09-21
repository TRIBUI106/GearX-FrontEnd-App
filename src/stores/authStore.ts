import { defineStore } from "pinia"
import type { AuthResponse } from "@/types/ApiResponse"
import { authLogout, authRegister } from "@/api/authApi"
import { toast } from "vue-sonner"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    data: null as object | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {

    register(user: any) {
      const res = authRegister(user)
      console.log(res)
    },

    login(data: AuthResponse) {
      this.token = data.token
      this.data = data

      localStorage.setItem("token", data.token)
      localStorage.setItem("metadata", JSON.stringify(this.data))
    },

    loadFromStorage() {
      const token = localStorage.getItem("token")
      const metadata = localStorage.getItem("metadata")

      if (token) this.token = token
      if (metadata) this.data = JSON.parse(metadata)
    },

    logout(token: string): Promise<boolean> {

      authLogout(token)
      toast.success('Đăng xuất thành công !')

      this.token = null
      localStorage.removeItem("token")
      localStorage.removeItem("metadata")

      return Promise.resolve(true)
    },
  },

})
