<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import type { Product } from "@/models/Product";

const productStore = useProductStore();
const router = useRouter();

const products = ref<Product[]>([]);

const navigateToProduct = (productId: number) => {
  router.push({ name: "product-detail", params: { id: productId } });
};

onMounted(async () => {
  await productStore.initHomePageProducts();
  products.value = productStore.products;
});
</script>

<template>
  <div class="w-full max-w-6xl">
    <h2 class="text-2xl font-semibold mb-6 text-center">Nổi bật hôm nay</h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
    >
      <div
        v-for="(p, i) in products"
        :key="p.productId"
        @click="navigateToProduct(p.productId)"
        class="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <img
          :src="p.mainImageUrl"
          :alt="p.name"
          class="w-full h-40 object-cover"
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
