<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
  >
    <div class="bg-white rounded-lg max-w-4xl w-full my-8">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới" }}
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Basic Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Tên sản phẩm *</label
            >
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="VD: Logitech G Pro X Superlight"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Brand ID *</label
            >
            <input
              v-model.number="formData.brandId"
              type="number"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Category ID *</label
            >
            <input
              v-model.number="formData.categoryId"
              type="number"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Model</label
            >
            <input
              v-model="formData.model"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="VD: GPX-001"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Bảo hành (tháng)</label
            >
            <input
              v-model.number="formData.warrantyMonths"
              type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="24"
            />
          </div>
        </div>

        <!-- Descriptions -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Mô tả ngắn</label
          >
          <textarea
            v-model="formData.shortDescription"
            rows="2"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Mô tả ngắn gọn về sản phẩm"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Mô tả chi tiết</label
          >
          <textarea
            v-model="formData.description"
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Mô tả đầy đủ về sản phẩm"
          ></textarea>
        </div>

        <!-- Attributes (JSON) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Thuộc tính (JSON)
            <span class="text-gray-500 text-xs"
              >VD: {"dpi": 25600, "sensor": "HERO 25K"}</span
            >
          </label>
          <textarea
            v-model="formData.attributes"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder='{"key": "value"}'
          ></textarea>
        </div>

        <!-- Pricing -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Giá bán *</label
            >
            <input
              v-model.number="formData.price"
              type="number"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2990000"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Giá gốc</label
            >
            <input
              v-model.number="formData.compareAtPrice"
              type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="3490000"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Số lượng *</label
            >
            <input
              v-model.number="formData.stockQuantity"
              type="number"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="50"
            />
          </div>
        </div>

        <!-- Image Upload -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Ảnh chính</label
            >
            <div class="flex items-center gap-4">
              <input
                type="file"
                @change="handleMainImageChange"
                accept="image/*"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <div
                v-if="mainImagePreview"
                class="relative w-20 h-20 rounded-lg overflow-hidden border"
              >
                <img
                  :src="mainImagePreview"
                  alt="Preview"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Ảnh phụ (Gallery)</label
            >
            <input
              type="file"
              @change="handleGalleryImagesChange"
              accept="image/*"
              multiple
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div
              v-if="galleryImagesPreviews.length > 0"
              class="flex gap-2 mt-2 flex-wrap"
            >
              <div
                v-for="(preview, index) in galleryImagesPreviews"
                :key="index"
                class="relative w-20 h-20 rounded-lg overflow-hidden border"
              >
                <img
                  :src="preview"
                  alt="Preview"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span
              v-if="isSubmitting"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></span>
            {{
              isSubmitting ? "Đang lưu..." : isEdit ? "Cập nhật" : "Thêm mới"
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { uploadMediaApi } from "@/api/mediaApi";
import { insertProductApi, updateProductApi } from "@/api/productApi";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "vue-sonner";
import type { Product } from "@/models/Product";

const props = defineProps<{
  product?: Product | null;
}>();

const emit = defineEmits<{
  close: [];
  success: [];
}>();

const authStore = useAuthStore();
const isEdit = computed(() => !!props.product);
const isSubmitting = ref(false);

const formData = ref({
  name: "",
  shortDescription: "",
  description: "",
  brandId: 0,
  categoryId: 0,
  model: "",
  attributes: "",
  price: 0,
  compareAtPrice: 0,
  currencyCode: "VND",
  stockQuantity: 0,
  warrantyMonths: 24,
  mainImageUrl: "",
  imageUrls: "",
  isActive: 1,
});

const mainImageFile = ref<File | null>(null);
const galleryImageFiles = ref<File[]>([]);
const mainImagePreview = ref<string>("");
const galleryImagesPreviews = ref<string[]>([]);

const handleMainImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    mainImageFile.value = file;
    mainImagePreview.value = URL.createObjectURL(file);
  }
};

const handleGalleryImagesChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files || []);
  galleryImageFiles.value = files;
  galleryImagesPreviews.value = files.map((file) => URL.createObjectURL(file));
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    const username = authStore.data
      ? (authStore.data as any).username
      : "admin";

    // Upload main image first if exists
    if (mainImageFile.value) {
      const uploadResponse = await uploadMediaApi([mainImageFile.value]);
      if (uploadResponse.data?.data?.[0]) {
        formData.value.mainImageUrl = uploadResponse.data.data[0];
      }
    }

    // Upload gallery images if exists
    if (galleryImageFiles.value.length > 0) {
      const uploadResponse = await uploadMediaApi(galleryImageFiles.value);
      if (uploadResponse.data?.data) {
        formData.value.imageUrls = JSON.stringify(uploadResponse.data.data);
      }
    }

    if (isEdit.value && props.product) {
      // Update existing product
      await updateProductApi(props.product.productId, {
        ...formData.value,
        updatedBy: username,
      });
      toast.success("Cập nhật sản phẩm thành công!");
    } else {
      // Create new product
      await insertProductApi({
        ...formData.value,
        createdBy: username,
      });
      toast.success("Thêm sản phẩm thành công!");
    }

    emit("success");
    emit("close");
  } catch (error: any) {
    console.error("Error saving product:", error);
    toast.error(
      error.response?.data?.message || "Có lỗi xảy ra khi lưu sản phẩm"
    );
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  if (props.product) {
    formData.value = {
      name: props.product.name,
      shortDescription: props.product.shortDescription || "",
      description: props.product.description || "",
      brandId: props.product.brandId,
      categoryId: props.product.categoryId,
      model: props.product.model || "",
      attributes: props.product.attributes || "",
      price: props.product.price,
      compareAtPrice: props.product.compareAtPrice || 0,
      currencyCode: props.product.currencyCode,
      stockQuantity: props.product.stockQuantity,
      warrantyMonths: props.product.warrantyMonths || 24,
      mainImageUrl: props.product.mainImageUrl || "",
      imageUrls: props.product.imageUrls || "",
      isActive: 1,
    };
    if (props.product.mainImageUrl) {
      mainImagePreview.value = props.product.mainImageUrl;
    }
  }
});
</script>
