<template>
  <AuroraBackground>
    <Motion
      as="div"
      :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
      :while-in-view="{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }"
      :transition="{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut',
      }"
      class="relative flex flex-col items-center justify-center gap-4 px-4"
    >
      <div class="text-center text-3xl font-bold md:text-7xl dark:text-white">
        GearX huh ? Sounds weird right ?
      </div>
      <div class="py-4 text-base font-extralight md:text-4xl dark:text-neutral-200">
        And this, coming soon....
      </div>
    </Motion>
  </AuroraBackground>
</template>

<script setup lang="ts">
import AuroraBackground from '@/components/ui/aurora-background/AuroraBackground.vue'
import { Motion } from "motion-v";
</script>