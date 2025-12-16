<template>
  <div class="w-full max-w-6xl">
    <div
      class="h-8 w-48 bg-gray-200 rounded-lg mb-6 mx-auto animate-pulse"
    ></div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
    >
      <div
        v-for="n in count"
        :key="n"
        class="bg-white rounded-xl shadow overflow-hidden"
      >
        <!-- Image skeleton -->
        <div
          class="w-full h-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]"
        ></div>

        <!-- Content skeleton -->
        <div class="p-4 space-y-3">
          <!-- Title skeleton -->
          <div
            class="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"
          ></div>

          <!-- Description skeleton -->
          <div class="space-y-2">
            <div
              class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"
            ></div>
            <div
              class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 animate-shimmer bg-[length:200%_100%]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count?: number;
}>();
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
