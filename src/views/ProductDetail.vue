<style scoped src="@/assets/style/product-detail.css"></style>

<template>
  <div class="product-detail-container">
    <!-- Loading State -->
    <LoadingSpinner
      v-if="isLoading"
      text="Đang tải thông tin sản phẩm..."
      subtext="Vui lòng đợi trong giây lát"
    />

    <!-- Product Detail Content -->
    <div v-else-if="product" class="product-detail">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/home" class="breadcrumb-link">Trang chủ</router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ product.name }}</span>
      </nav>

      <div class="product-content">
        <!-- Left: Image Section -->
        <div class="image-section">
          <div class="main-image">
            <img :src="product.mainImageUrl" :alt="product.name" />
          </div>
        </div>

        <!-- Right: Product Info -->
        <div class="info-section">
          <!-- Product Name -->
          <h1 class="product-name">{{ product.name }}</h1>

          <!-- Price Section -->
          <div class="price-section">
            <div class="price-main">
              <span class="currency">{{ product.currencyCode }}</span>
              <span class="amount">{{ formatPrice(product.price) }}</span>
            </div>
            <div
              v-if="product.compareAtPrice > product.price"
              class="price-compare"
            >
              <span class="compare-label">Giá gốc:</span>
              <span class="compare-amount text-danger"
                >{{ product.currencyCode }}
                {{ formatPrice(product.compareAtPrice) }}</span
              >
              <!-- <span class="discount-badge"
                >-{{
                  calculateDiscount(product.price, product.compareAtPrice)
                }}%</span
              > -->
            </div>
          </div>

          <!-- Stock Status -->
          <div class="stock-status">
            <span v-if="product.stockQuantity > 0" class="in-stock">
              <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              Còn hàng ({{ product.stockQuantity }} sản phẩm)
            </span>
            <span v-else class="out-of-stock">
              <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              Hết hàng
            </span>
          </div>

          <!-- Short Description -->
          <div class="short-description">
            <p>{{ product.shortDescription }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button
              class="btn btn-primary"
              :disabled="product.stockQuantity === 0"
            >
              <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </svg>
              Thêm vào giỏ hàng
            </button>
            <button
              class="btn btn-secondary"
              :disabled="product.stockQuantity === 0"
            >
              Mua ngay
            </button>
          </div>

          <!-- Specifications Card -->
          <div class="specs-card">
            <h3 class="specs-title">Thông số kỹ thuật</h3>
            <div class="specs-grid">
              <div class="spec-item">
                <span class="spec-label">Model:</span>
                <span class="spec-value">{{ product.model }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Bảo hành:</span>
                <span class="spec-value"
                  >{{ product.warrantyMonths }} tháng</span
                >
              </div>
              <template v-if="parseAttributes">
                <div
                  v-for="attr in parseAttributes"
                  :key="attr.key"
                  class="spec-item"
                >
                  <span class="spec-label">{{ attr.key }}:</span>
                  <span class="spec-value">{{ attr.value }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Full Description Section -->
      <div class="description-section">
        <h2 class="section-title">Mô tả chi tiết</h2>
        <div class="description-content">
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="error-state">
      <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <h2>Không tìm thấy sản phẩm</h2>
      <p>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      <router-link to="/home" class="btn btn-primary"
        >Quay về trang chủ</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import type { Product } from "@/models/Product";

const route = useRoute();
const productStore = useProductStore();

const product = computed(() => productStore.selectedProduct);
const isLoading = computed(() => productStore.isLoading);

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

const calculateDiscount = (price: number, comparePrice: number): number => {
  return Math.round(((comparePrice - price) / comparePrice) * 100);
};

const parseAttributes = computed(() => {
  if (!product.value?.attributes) return null;
  try {
    const parsed = JSON.parse(product.value.attributes);
    return Object.entries(parsed).map(([key, value]) => ({
      key,
      value: String(value),
    }));
  } catch (error) {
    console.error("Failed to parse attributes:", error);
    return null;
  }
});

onMounted(async () => {
  const productId = Number(route.params.id);
  if (productId) {
    try {
      await productStore.fetchProductById(productId);
    } catch (error) {
      console.error("Failed to load product:", error);
    }
  }
});
</script>
