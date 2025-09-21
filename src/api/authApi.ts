import { apiService } from "./axiosConfig";
import type { AuthApiResponse } from "@/types/ApiResponse"

export const authLogin = async (user: any): Promise<AuthApiResponse> => {
  return await apiService.post<AuthApiResponse>("auth/login", user);
};

export const checkToken = async (token: string | null): Promise<boolean> => {
  if (!token) return false;

  // console.log("token is not null")
  
  try {
    const response = await apiService.post<AuthApiResponse>("auth/introspect", { token });
    // console.log()
    return response.success;
  } catch (error) {
    console.log(error)
    return false;
  }
}

export const authLogout = async (token: string): Promise<boolean> => {
  try {
    const response = await apiService.post<AuthApiResponse>("auth/logout", { token });
    // console.log()
    window.location.href="/"
    return response.success;
  } catch (error) {
    console.log(error)
    return false;
  }
}