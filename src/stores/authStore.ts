import { defineStore } from "pinia"
import type { AuthResponse } from "@/types/ApiResponse"
import { authLogout } from "@/api/authApi"
import { toast } from "vue-sonner"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    username: null as string | null,
    expiresAt: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    login(data: AuthResponse) {
      this.token = data.token
      this.username = data.username
      this.expiresAt = data.expiresAt

      localStorage.setItem("token", data.token)
      localStorage.setItem("username", data.username)
      localStorage.setItem("expiresAt", data.expiresAt)
    },

    loadFromStorage() {
      const token = localStorage.getItem("token")
      const username = localStorage.getItem("username")
      const expiresAt = localStorage.getItem("expiresAt")

      if (token) this.token = token
      if (username) this.username = username
      if (expiresAt) this.expiresAt = expiresAt
    },

    logout(token: string): Promise<boolean> {

      authLogout(token)
      toast.success('Đăng xuất thành công !')

      this.token = null
      this.username = null
      this.expiresAt = null
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("expiresAt")

      return Promise.resolve(true)
    },
  },

})
