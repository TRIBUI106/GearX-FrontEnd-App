<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-8">
          <RouterLink to="/home" class="flex items-center gap-2">
            <img
              src="../../assets/images/favicon.ico"
              alt="GearX"
              class="h-8 w-8"
            />
            <span class="text-xl font-bold text-gray-900">GearX</span>
          </RouterLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm font-medium">
              <li>
                <RouterLink
                  to="/home"
                  class="text-gray-700 hover:text-blue-600 transition-colors"
                  >Trang chủ</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/products"
                  class="text-gray-700 hover:text-blue-600 transition-colors"
                  >Sản phẩm</RouterLink
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-700 hover:text-blue-600 transition-colors"
                  >Thương hiệu</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-700 hover:text-blue-600 transition-colors"
                  >Khuyến mãi</a
                >
              </li>
            </ul>
          </nav>
        </div>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex flex-1 max-w-md mx-4">
          <div class="relative w-full">
            <input
              type="text"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              placeholder="Tìm kiếm sản phẩm..."
              class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              @click="handleSearch"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
            >
              <svg
                class="h-5 w-5"
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
            </button>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-4">
          <!-- Cart Icon -->
          <button
            class="relative hidden md:block text-gray-700 hover:text-blue-600 transition-colors"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span
              class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white"
              >0</span
            >
          </button>

          <!-- Avatar Dropdown (Desktop) -->
          <div class="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <button
                  type="button"
                  class="overflow-hidden rounded-full border-2 border-gray-200 hover:border-blue-500 transition-colors"
                >
                  <span class="sr-only">Toggle dashboard menu</span>
                  <img
                    src="../../assets/images/gx-circle.png"
                    alt=""
                    class="size-10 object-cover"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent class="w-56">
                <DropdownMenuItem>
                  <RouterLink
                    to="/user/profile"
                    class="flex w-full items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    Tài khoản
                  </RouterLink>
                </DropdownMenuItem>

                <!-- Admin Dashboard Link -->
                <DropdownMenuItem v-if="authStore.isAdmin">
                  <RouterLink
                    to="/admin"
                    class="flex w-full items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Quản trị
                  </RouterLink>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-red-700 hover:bg-red-50">
                  <button
                    @click="handleLogout"
                    class="flex w-full items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                    Đăng xuất
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
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
      </div>

      <!-- Mobile Search Bar -->
      <div class="md:hidden pb-3">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            placeholder="Tìm kiếm sản phẩm..."
            class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            @click="handleSearch"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
          >
            <svg
              class="h-5 w-5"
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
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200 py-3"
      >
        <nav class="space-y-1">
          <RouterLink
            to="/home"
            class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            @click="toggleMobileMenu"
            >Trang chủ</RouterLink
          >
          <RouterLink
            to="/products"
            class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            @click="toggleMobileMenu"
            >Sản phẩm</RouterLink
          >
          <a
            href="#"
            class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >Thương hiệu</a
          >
          <a
            href="#"
            class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >Khuyến mãi</a
          >
        </nav>

        <!-- Mobile user menu -->
        <div class="border-t border-gray-200 mt-3 pt-3">
          <div class="space-y-1">
            <RouterLink
              to="/user/profile"
              class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              @click="toggleMobileMenu"
              >Tài khoản</RouterLink
            >
            <!-- Admin Dashboard Link (Mobile) -->
            <RouterLink
              v-if="authStore.isAdmin"
              to="/admin"
              class="block rounded-lg px-3 py-2 text-base font-medium hover:bg-gray-100"
              @click="toggleMobileMenu"
              >Quản trị</RouterLink
            >
            <button
              @click="handleLogout"
              class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-red-700 hover:bg-red-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Cookie from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { RouterLink, useRouter } from "vue-router";

const isMobileMenuOpen = ref(false);
const searchQuery = ref("");
const router = useRouter();

const authStore = useAuthStore();

// Load role from storage on mount
onMounted(() => {
  if (authStore.role === null) {
    authStore.loadFromStorage();
  }
  // console.log("Current role:", authStore.role, "isAdmin:", authStore.isAdmin);
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: "products",
      query: { search: searchQuery.value.trim() },
    });
    isMobileMenuOpen.value = false;
  }
};

const handleLogout = async () => {
  const token = Cookie.get("token");
  if (token) {
    if (await authStore.logout(token)) {
      router.push("/");
    }
  }
};
</script>
