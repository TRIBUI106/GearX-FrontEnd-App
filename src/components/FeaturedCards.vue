<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";
import { onMounted, computed } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import ProductCardSkeleton from "./ProductCardSkeleton.vue";

const productStore = useProductStore();
const router = useRouter();

const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);
const isFirstLoad = computed(
  () => !productStore.isProductsLoaded && isLoading.value
);

const navigateToProduct = (productId: number) => {
  router.push({ name: "product-detail", params: { id: productId } });
};

onMounted(async () => {
  await productStore.initHomePageProducts();
});
</script>

<template>
  <!-- Show skeleton on first load -->
  <ProductCardSkeleton v-if="isFirstLoad" :count="10" />

  <!-- Show content when loaded -->
  <div v-else class="w-full max-w-6xl">
    <h2 class="text-2xl font-semibold mb-6 text-center">Nổi bật hôm nay</h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
    >
      <div
        v-for="p in products"
        :key="p.productId"
        @click="navigateToProduct(p.productId)"
        class="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105"
      >
        <img
          :src="p.mainImageUrl"
          :alt="p.name"
          class="w-full h-40 object-cover"
          loading="lazy"
        />
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2 truncate">{{ p.name }}</h3>
          <p class="text-gray-500 text-sm line-clamp-2">
            {{ p.shortDescription }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
