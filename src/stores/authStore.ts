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
    data: null as object | null,
    role: null as string | null  // 'admin' | 'seller' | 'user'
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
    isSeller: (state) => state.role === 'seller',
    isUser: (state) => state.role === 'user',
  },

  actions: {
    async login(data: AuthResponse) {

      this.token = data.token

      // Store token in cookie
      Cookies.set("token", this.token, {
        expires: 7,
        path: '/',
        sameSite: 'Strict'
      })

      // Decode JWT to get role
      const decodedToken = jwtDecode(this.token) as any
      const username = decodedToken.username
      this.role = decodedToken.role

      // Fetch and store user metadata
      const metadata = await userFetchData(username)
      this.data = metadata.data.data
      localStorage.setItem("metadata", JSON.stringify(this.data))
      if (this.role !== null) {
        localStorage.setItem("role", this.role)
      }
    },

    loadFromStorage() {
      const token = Cookies.get("token")
      const metadata = localStorage.getItem("metadata")
      const role = localStorage.getItem("role")

      if (token) this.token = token
      if (metadata) this.data = JSON.parse(metadata)
      if (role) this.role = role
    },

    logout(token: string): Promise<boolean> {

      authLogout(token)
      toast.success('Đăng xuất thành công !')

      this.token = null
      this.role = null
      Cookies.remove("token")
      localStorage.removeItem("metadata")
      localStorage.removeItem("role")

      return Promise.resolve(true)
    },
  },

})
