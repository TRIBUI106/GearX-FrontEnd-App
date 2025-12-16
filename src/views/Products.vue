<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Sản phẩm</h1>
        <p class="mt-2 text-sm text-gray-600">
          Khám phá các sản phẩm gear công nghệ chất lượng cao
        </p>
      </div>

      <!-- Filters & Sort -->
      <div
        class="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
      >
        <div class="flex gap-2 flex-wrap">
          <button
            @click="selectedCategory = null"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100',
            ]"
          >
            Tất cả
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100',
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Sắp xếp:</span>
          <select
            v-model="sortBy"
            class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name">Tên A-Z</option>
          </select>
        </div>
      </div>

      <!-- Products Grid -->
      <div
        v-if="isLoading && products.length === 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCardSkeleton :count="8" />
      </div>

      <div v-else-if="products.length > 0">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="product in products"
            :key="product.productId"
            @click="navigateToProduct(product.productId)"
            class="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
          >
            <div class="relative overflow-hidden aspect-square">
              <img
                :src="product.mainImageUrl"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div
                v-if="product.compareAtPrice > product.price"
                class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold"
              >
                -{{ calculateDiscount(product.price, product.compareAtPrice) }}%
              </div>
            </div>
            <div class="p-4">
              <h3
                class="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
              >
                {{ product.name }}
              </h3>
              <p class="text-gray-500 text-sm line-clamp-2 mb-3">
                {{ product.shortDescription }}
              </p>
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-bold text-blue-600">
                  {{ formatPrice(product.price) }}đ
                </span>
                <span
                  v-if="product.compareAtPrice > product.price"
                  class="text-sm text-gray-400 line-through"
                >
                  {{ formatPrice(product.compareAtPrice) }}đ
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More / Infinite Scroll Trigger -->
        <div ref="loadMoreTrigger" class="mt-8 flex justify-center">
          <div
            v-if="isLoadingMore"
            class="flex items-center gap-2 text-gray-600"
          >
            <div
              class="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"
            ></div>
            <span>Đang tải thêm...</span>
          </div>
          <div v-else-if="hasMore" class="text-gray-500 text-sm">
            Cuộn xuống để tải thêm sản phẩm
          </div>
          <div v-else class="text-gray-500 text-sm">
            Đã hiển thị tất cả sản phẩm
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg
          class="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <h3 class="mt-4 text-lg font-semibold text-gray-900">
          Không tìm thấy sản phẩm
        </h3>
        <p class="mt-2 text-sm text-gray-600">
          Thử thay đổi bộ lọc hoặc tìm kiếm khác
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { searchProductsApi } from "@/api/productApi";
import ProductCardSkeleton from "@/components/ProductCardSkeleton.vue";
import type { Product } from "@/models/Product";

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();

const products = ref<Product[]>([]);
const isLoading = ref(false);
const isLoadingMore = ref(false);
const hasMore = ref(true);
const currentPage = ref(1);
const pageSize = 20;

const selectedCategory = ref<string | null>(null);
const sortBy = ref("newest");
const categories = ref(["Mouse", "Keyboard", "Headset", "Monitor"]);

const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

const calculateDiscount = (price: number, comparePrice: number): number => {
  return Math.round(((comparePrice - price) / comparePrice) * 100);
};

const navigateToProduct = (productId: number) => {
  router.push({ name: "product-detail", params: { id: productId } });
};

const loadProducts = async (append = false) => {
  if (append) {
    isLoadingMore.value = true;
  } else {
    isLoading.value = true;
    products.value = [];
    currentPage.value = 1;
  }

  try {
    const response = await searchProductsApi({
      q: (route.query.search as string) || "",
      page: currentPage.value,
      size: pageSize,
      sortBy:
        sortBy.value === "newest"
          ? "created_at"
          : sortBy.value.includes("price")
            ? "price"
            : "name",
      dir: sortBy.value.includes("desc") ? "desc" : "asc",
    });

    // Extract data handling both structures
    let newProducts: Product[] = [];
    if (response.data?.data?.data) {
      newProducts = response.data.data.data;
    } else if (Array.isArray(response.data?.data)) {
      newProducts = response.data.data;
    }

    if (append) {
      products.value = [...products.value, ...newProducts];
    } else {
      products.value = newProducts;
    }

    // Check if we have more pages (simple check based on page size return)
    hasMore.value = newProducts.length === pageSize;
  } catch (error) {
    console.error("Error loading products:", error);
  } finally {
    isLoading.value = false;
    isLoadingMore.value = false;
  }
};

const loadMore = () => {
  if (!isLoadingMore.value && hasMore.value) {
    currentPage.value++;
    loadProducts(true);
  }
};

// Setup Intersection Observer for infinite scroll
onMounted(() => {
  loadProducts();

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !isLoadingMore.value) {
        loadMore();
      }
    },
    { threshold: 0.1 }
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

// Watch for filter/sort changes
watch([selectedCategory, sortBy], () => {
  loadProducts();
});

// Watch for search query from route
watch(
  () => route.query.search,
  (newSearch) => {
    if (newSearch) {
      console.log("Searching for:", newSearch);
      // TODO: Implement search API call
      loadProducts();
    }
  },
  { immediate: true }
);
</script>
