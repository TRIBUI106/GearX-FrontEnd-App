import { defineStore } from "pinia"
import type { AuthResponse } from "@/models/ApiResponse"
import { authLogout } from "@/api/authApi"
import { toast } from "vue-sonner"
import Cookies from 'js-cookie'
import { userFetchData } from "@/api/userApi"
import { jwtDecode } from "jwt-decode"

export const useAuthStore = defineStore("auth", {

  state: () => ({
    token: null as string | null,
    data: null as object | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(data: AuthResponse) {

      this.token = data.token

      // Store
      Cookies.set("token", this.token, {
        expires: 7,
        path: '/',
        sameSite: 'Strict'
      })

      const decodedToken = jwtDecode(this.token)

      const metadata = await userFetchData(data.username)
      this.data = metadata.data.data
      localStorage.setItem("metadata", JSON.stringify(this.data))
    },

    loadFromStorage() {
      const token = Cookies.get("token")
      const metadata = localStorage.getItem("metadata")

      if (token) this.token = token
      if (metadata) this.data = JSON.parse(metadata)
    },

    logout(token: string): Promise<boolean> {

      authLogout(token)
      toast.success('Đăng xuất thành công !')

      this.token = null
      Cookies.remove("token")
      localStorage.removeItem("metadata")

      return Promise.resolve(true)
    },
  },

})
