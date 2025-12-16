import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from "@/models/Product"
import { getHomepageProductsApi, getProductByIdApi } from "@/api/productApi"

export const useProductStore = defineStore("product", () => {
    const products = ref<Product[]>([])
    const selectedProduct = ref<Product | null>(null)
    const isLoading = ref(false)

    const initHomePageProducts = async () => {
        const response = await getHomepageProductsApi()        
        products.value = response.data.data.data
        return response       
    }

    const fetchProductById = async (productId: number) => {
        isLoading.value = true
        try {
            const response = await getProductByIdApi(productId)
            selectedProduct.value = response.data.data
            return response.data.data
        } catch (error) {
            console.error('Error fetching product:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    return {
        products,
        selectedProduct,
        isLoading,
        initHomePageProducts,
        fetchProductById
    }

})