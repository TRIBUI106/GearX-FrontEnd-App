<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Trang Quản Trị</h1>
        <p class="mt-2 text-sm text-gray-600">Quản lý sản phẩm và danh mục</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <svg
                class="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Tổng sản phẩm</p>
              <p class="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-black rounded-md p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-shuffle-icon lucide-shuffle"
              >
                <path d="m18 14 4 4-4 4" />
                <path d="m18 2 4 4-4 4" />
                <path
                  d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"
                />
                <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
                <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Thương hiệu</p>
              <p class="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg
                class="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Danh mục</p>
              <p class="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-orange-500 rounded-md p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-user-icon lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Người dùng</p>
              <p class="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Management Tabs -->
      <div class="bg-white rounded-lg shadow">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              @click="activeTab = 'products'"
              :class="[
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              Quản lý Sản phẩm
            </button>
            <button
              @click="activeTab = 'categories'"
              :class="[
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              Quản lý Danh mục
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Products Tab -->
          <div v-if="activeTab === 'products'">
            <!-- Actions Bar -->
            <div
              class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"
            >
              <div class="relative w-full md:w-96">
                <input
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg
                  class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                @click="openProductForm()"
                class="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Thêm sản phẩm
              </button>
            </div>

            <!-- Products Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sản phẩm
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Giá
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Kho
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Trạng thái
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-if="isLoading">
                    <td
                      colspan="5"
                      class="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                  <tr v-else-if="products.length === 0">
                    <td
                      colspan="5"
                      class="px-6 py-12 text-center text-gray-500"
                    >
                      <svg
                        class="mx-auto h-12 w-12 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      Không tìm thấy sản phẩm nào
                    </td>
                  </tr>
                  <tr
                    v-else
                    v-for="product in products"
                    :key="product.productId"
                    class="hover:bg-gray-50"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded-full object-cover"
                            :src="product.mainImageUrl || '/placeholder.png'"
                            alt=""
                          />
                        </div>
                        <div class="ml-4">
                          <div
                            class="text-sm font-medium text-gray-900 line-clamp-1 w-64"
                            :title="product.name"
                          >
                            {{ product.name }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ product.model }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ formatPrice(product.price) }}
                      </div>
                      <div
                        v-if="product.compareAtPrice > product.price"
                        class="text-xs text-red-500 line-through"
                      >
                        {{ formatPrice(product.compareAtPrice) }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ product.stockQuantity }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="
                          product.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        "
                      >
                        {{ product.isActive ? "Hoạt động" : "Đã ẩn" }}
                      </span>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <button
                        @click="openProductForm(product)"
                        class="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Sửa
                      </button>
                      <button
                        @click="confirmDelete(product)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="flex justify-between items-center mt-4">
              <span class="text-sm text-gray-700">Trang {{ currentPage }}</span>
              <div class="flex gap-2">
                <button
                  @click="changePage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  Trước
                </button>
                <button
                  @click="changePage(currentPage + 1)"
                  class="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Sau
                </button>
              </div>
            </div>
          </div>

          <!-- Categories Tab (Placeholder) -->
          <div v-if="activeTab === 'categories'">
            <div class="text-center py-12 text-gray-500">
              <p>Tính năng quản lý danh mục đang được phát triển...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Form Modal -->
    <ProductForm
      v-if="showProductForm"
      :product="selectedProduct"
      @close="closeProductForm"
      @success="handleFormSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { searchProductsApi, deleteProductApi } from "@/api/productApi";
import ProductForm from "@/components/Admin/ProductForm.vue";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "vue-sonner";
import type { Product } from "@/models/Product";

const activeTab = ref<"products" | "categories">("products");
const products = ref<Product[]>([]);
const isLoading = ref(false);
const searchQuery = ref("");
const currentPage = ref(1);
const showProductForm = ref(false);
const selectedProduct = ref<Product | null>(null);
const authStore = useAuthStore();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const response = await searchProductsApi({
      q: searchQuery.value,
      page: currentPage.value,
      size: 10,
      sortBy: "created_at",
      dir: "desc",
    });
    // Correctly extract data based on API response structure: response.data.data.data
    // structure is { data: { data: [], total: ..., currentPage: ... } }
    if (response.data?.data?.data) {
      products.value = response.data.data.data;
    } else if (Array.isArray(response.data?.data)) {
      products.value = response.data.data;
    } else {
      products.value = [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Không thể tải danh sách sản phẩm");
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchProducts();
};

const changePage = (page: number) => {
  if (page < 1) return;
  currentPage.value = page;
  fetchProducts();
};

const openProductForm = (product: Product | null = null) => {
  selectedProduct.value = product;
  showProductForm.value = true;
};

const closeProductForm = () => {
  showProductForm.value = false;
  selectedProduct.value = null;
};

const handleFormSuccess = () => {
  fetchProducts();
};

const confirmDelete = async (product: Product) => {
  if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`)) {
    try {
      const username = authStore.data
        ? (authStore.data as any).username
        : "admin";
      await deleteProductApi(product.productId, username);
      toast.success("Đã xóa sản phẩm thành công");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Không thể xóa sản phẩm");
    }
  }
};

onMounted(() => {
  fetchProducts();
});
</script>
