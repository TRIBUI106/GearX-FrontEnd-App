import { apiService } from "./axiosConfig";

export const getHomepageProductsApi = async (page: number = 1, size: number = 10) => {
    return await apiService.get("product/search", {
        params: {
            page,
            size
        }
    })
}

export const getProductByIdApi = async (productId: number) => {
    return await apiService.get(`product/get/${productId}`)
}
