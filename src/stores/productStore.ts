import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from "@/models/Product"
import { getHomepageProductsApi, getProductByIdApi } from "@/api/productApi"

const CACHE_KEY = 'gearx_products_cache'
const CACHE_TIMESTAMP_KEY = 'gearx_products_cache_timestamp'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes in milliseconds

export const useProductStore = defineStore("product", () => {
    const products = ref<Product[]>([])
    const selectedProduct = ref<Product | null>(null)
    const isLoading = ref(false)
    const isProductsLoaded = ref(false)
    const productCache = ref<Map<number, Product>>(new Map())

    // Load cache from localStorage on init
    const loadFromCache = () => {
        try {
            const cachedData = localStorage.getItem(CACHE_KEY)
            const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
            
            if (cachedData && timestamp) {
                const age = Date.now() - parseInt(timestamp)
                
                // Check if cache is still valid (within TTL)
                if (age < CACHE_TTL) {
                    const parsed = JSON.parse(cachedData)
                    products.value = parsed
                    isProductsLoaded.value = true
                    
                    // Rebuild productCache Map
                    parsed.forEach((product: Product) => {
                        productCache.value.set(product.productId, product)
                    })
                    
                    console.log(`📦 Loaded ${parsed.length} products from cache (age: ${Math.round(age / 1000)}s)`)
                    return true
                } else {
                    console.log('⏰ Cache expired, will fetch fresh data')
                    localStorage.removeItem(CACHE_KEY)
                    localStorage.removeItem(CACHE_TIMESTAMP_KEY)
                }
            }
        } catch (error) {
            console.error('Error loading cache:', error)
        }
        return false
    }

    // Save cache to localStorage
    const saveToCache = (data: Product[]) => {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data))
            localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
            console.log('💾 Saved products to cache')
        } catch (error) {
            console.error('Error saving cache:', error)
        }
    }

    const initHomePageProducts = async (forceRefresh = false) => {
        // Try to load from cache first
        if (!forceRefresh && loadFromCache()) {
            return { data: { data: { data: products.value } } }
        }

        // Only fetch if not loaded or force refresh
        if (isProductsLoaded.value && !forceRefresh) {
            console.log('📦 Using cached products (in-memory)')
            return { data: { data: { data: products.value } } }
        }

        isLoading.value = true
        try {
            console.log('🌐 Fetching products from API...')
            const response = await getHomepageProductsApi()        
            products.value = response.data.data.data
            isProductsLoaded.value = true
            
            // Cache individual products
            products.value.forEach(product => {
                productCache.value.set(product.productId, product)
            })
            
            // Save to localStorage
            saveToCache(products.value)
            
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
        localStorage.removeItem(CACHE_KEY)
        localStorage.removeItem(CACHE_TIMESTAMP_KEY)
        console.log('🗑️ Cache cleared (memory + localStorage)')
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