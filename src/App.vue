<template>
  <RouterView />
  <Toaster position="top-right" closeButton closeButtonPosition="bottom-left" :expand="false"/>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>