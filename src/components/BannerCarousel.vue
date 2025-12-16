<template>
  <div class="w-full max-w-5xl relative">
    <swiper
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      class="rounded-2xl overflow-hidden shadow-lg"
    >
      <swiper-slide v-for="(banner, i) in banners" :key="i">
        <img
          :src="banner"
          alt="banner"
          class="w-full h-64 md:h-96 object-cover"
        />
      </swiper-slide>
    </swiper>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <span
        v-for="(_, i) in banners"
        :key="i"
        class="w-3 h-3 bg-white/50 rounded-full"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/autoplay";

const banners = [
  "/images/banners/banner1.jpg",
  "/images/banners/banner2.png",
  "/images/banners/banner3.jpg",
];
</script>
