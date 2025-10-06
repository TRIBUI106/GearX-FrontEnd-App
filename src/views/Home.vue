<template>
  <div class="flex flex-col items-center gap-10 p-6">
    <BannerCarousel />

    <FeaturedCards />
  </div>
</template>

<script setup>
import BannerCarousel from '@/components/BannerCarousel.vue';
import FeaturedCards from '@/components/FeaturedCards.vue'; 
</script>
