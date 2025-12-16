<template>
  <div class="loading-overlay">
    <div class="loading-content">
      <div class="spinner-container">
        <div class="spinner"></div>
        <div class="spinner-glow"></div>
      </div>
      <p class="loading-text">{{ text }}</p>
      <div v-if="subtext" class="loading-subtext">{{ subtext }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text?: string;
  subtext?: string;
}>();
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.spinner-container {
  position: relative;
  width: 80px;
  height: 80px;
}

.spinner {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-right-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.spinner-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: rgba(59, 130, 246, 0.3);
  border-right-color: rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite reverse;
  filter: blur(4px);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  animation: pulse 2s ease-in-out infinite;
}

.loading-subtext {
  font-size: 0.875rem;
  color: #6b7280;
  animation: pulse 2s ease-in-out infinite;
  animation-delay: 0.2s;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
