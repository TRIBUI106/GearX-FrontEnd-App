<template>
  <div class="product-detail-container">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Đang tải thông tin sản phẩm...</p>
    </div>

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
              <span class="compare-amount"
                >{{ product.currencyCode }}
                {{ formatPrice(product.compareAtPrice) }}</span
              >
              <span class="discount-badge"
                >-{{
                  calculateDiscount(product.price, product.compareAtPrice)
                }}%</span
              >
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
              <div v-if="product.attributes" class="spec-item full-width">
                <span class="spec-label">Thuộc tính:</span>
                <span class="spec-value">{{ product.attributes }}</span>
              </div>
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

<style scoped>
.product-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  min-height: 60vh;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.breadcrumb-link {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #2563eb;
}

.breadcrumb-separator {
  color: #d1d5db;
}

.breadcrumb-current {
  color: #111827;
  font-weight: 500;
}

/* Product Content */
.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* Image Section */
.image-section {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.main-image {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  aspect-ratio: 1;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-image:hover img {
  transform: scale(1.05);
}

/* Info Section */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-name {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
  margin: 0;
}

/* Price Section */
.price-section {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 0.75rem;
  border: 1px solid #bae6fd;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.currency {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0369a1;
}

.amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0c4a6e;
  letter-spacing: -0.02em;
}

.price-compare {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.compare-label {
  font-size: 0.875rem;
  color: #64748b;
}

.compare-amount {
  font-size: 1rem;
  color: #94a3b8;
  text-decoration: line-through;
}

.discount-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background: #dc2626;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 0.375rem;
}

/* Stock Status */
.stock-status {
  display: flex;
  align-items: center;
}

.in-stock,
.out-of-stock {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.in-stock {
  background: #d1fae5;
  color: #065f46;
}

.out-of-stock {
  background: #fee2e2;
  color: #991b1b;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Short Description */
.short-description {
  padding: 1rem;
  background: #f9fafb;
  border-left: 4px solid #3b82f6;
  border-radius: 0.5rem;
}

.short-description p {
  margin: 0;
  color: #374151;
  line-height: 1.6;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.btn-secondary:hover:not(:disabled) {
  background: #eff6ff;
  transform: translateY(-2px);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Specifications Card */
.specs-card {
  padding: 1.5rem;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.specs-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .specs-grid {
    grid-template-columns: 1fr;
  }
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.spec-item.full-width {
  grid-column: 1 / -1;
}

.spec-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.spec-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 600;
}

/* Description Section */
.description-section {
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.description-content {
  color: #374151;
  line-height: 1.8;
  font-size: 1rem;
}

.description-content p {
  margin: 0;
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
  text-align: center;
}

.error-icon {
  width: 64px;
  height: 64px;
  color: #ef4444;
}

.error-state h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.error-state p {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
}
</style>
