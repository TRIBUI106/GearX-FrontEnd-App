import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from "@/models/Product"
import { getHomepageProductsApi, getProductByIdApi } from "@/api/productApi"

export const useProductStore = defineStore("product", () => {
    const products = ref<Product[]>([])
    const selectedProduct = ref<Product | null>(null)
    const isLoading = ref(false)
    const isProductsLoaded = ref(false) // Cache flag
    const productCache = ref<Map<number, Product>>(new Map()) // Cache individual products

    const initHomePageProducts = async (forceRefresh = false) => {
        // Only fetch if not loaded or force refresh
        if (isProductsLoaded.value && !forceRefresh) {
            console.log('📦 Using cached products')
            return { data: { data: { data: products.value } } }
        }

        isLoading.value = true
        try {
            const response = await getHomepageProductsApi()        
            products.value = response.data.data.data
            isProductsLoaded.value = true
            
            // Cache individual products
            products.value.forEach(product => {
                productCache.value.set(product.productId, product)
            })
            
            console.log('✅ Products loaded and cached')
            return response
        } catch (error) {
            console.error('Error loading products:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const fetchProductById = async (productId: number, forceRefresh = false) => {
        // Check cache first
        if (!forceRefresh && productCache.value.has(productId)) {
            console.log(`📦 Using cached product #${productId}`)
            selectedProduct.value = productCache.value.get(productId)!
            return selectedProduct.value
        }

        isLoading.value = true
        try {
            const response = await getProductByIdApi(productId)
            selectedProduct.value = response.data.data
            
            // Update cache
            productCache.value.set(productId, response.data.data)
            
            console.log(`✅ Product #${productId} loaded and cached`)
            return response.data.data
        } catch (error) {
            console.error('Error fetching product:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const clearCache = () => {
        products.value = []
        productCache.value.clear()
        isProductsLoaded.value = false
        console.log('🗑️ Cache cleared')
    }

    return {
        products,
        selectedProduct,
        isLoading,
        isProductsLoaded,
        initHomePageProducts,
        fetchProductById,
        clearCache
    }

})