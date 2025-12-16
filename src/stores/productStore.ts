import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from "@/models/Product"
import { searchProductsApi } from "@/api/productApi"

export const useProductStore = defineStore("product", () => {
    const products = ref<Product[]>([])

    const initHomePageProducts = async () => {
        const response = await searchProductsApi()        
        products.value = response.data.data.data
        return response       
    }

    return {
        products,
        initHomePageProducts
    }

})