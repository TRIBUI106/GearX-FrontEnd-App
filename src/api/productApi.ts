import { apiService } from "./axiosConfig";

export const searchProductsApi = async (page: number = 1, size: number = 20) => {
    return await apiService.get("product/search", {
        params: {
            page,
            size
        }
    })
}   
