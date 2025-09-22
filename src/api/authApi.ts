import router from "@/router";
import { apiService } from "./axiosConfig";
import type { AuthApiResponse } from "@/models/ApiResponse"

export const authLogin = async (user: any) => {
  return await apiService.post("auth/login", user);
};

export const checkToken = async (token: string | null): Promise<boolean> => {
  if (!token) return false;

  // console.log("token is not null")
  
  try {
    const response = await apiService.post("auth/introspect", { token });
    // console.log()
    return response.data.success;
  } catch (error) {
    console.log(error)
    return false;
  }
}

export const authLogout = async (token: string): Promise<boolean> => {
  try {
    const response = await apiService.post("auth/logout", { token });
    // console.log()
    router.push("/")
    return response.data.success;
  } catch (error) {
    console.log(error)
    return false;
  }
}