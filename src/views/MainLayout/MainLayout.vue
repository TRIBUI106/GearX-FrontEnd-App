<template>
  <header class="bg-white">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex-1 md:flex md:items-center md:gap-12">
          <!-- Logo section -->
          <RouterLink to="/home" class="block text-teal-600" href="#">
            <span class="sr-only">Home</span>
            <img
              src="../../assets/images/favicon.ico"
              alt=""
              class="h-8"
              viewBox="0 0 28 24"
              fill="none"
            />
          </RouterLink>
        </div>

        <div class="md:flex md:items-center md:gap-12">
          <!-- Navigation menu -->
          <nav aria-label="Global" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                  >About</a
                >
              </li>
              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                  >Careers</a
                >
              </li>
              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                  >History</a
                >
              </li>
              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                  >Services</a
                >
              </li>
              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                  >Projects</a
                >
              </li>
              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                  >Blog</a
                >
              </li>
            </ul>
          </nav>

          <!-- Avatar dropdown -->
          <div class="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <button
                  type="button"
                  class="overflow-hidden rounded-full border border-gray-300 shadow-inner"
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
                    My profile
                  </RouterLink>
                </DropdownMenuItem>

                <!-- Admin Dashboard Link -->
                <DropdownMenuItem v-if="authStore.isAdmin">
                  <RouterLink
                    to="/admin"
                    class="flex w-full items-center gap-2 text-blue-600"
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
                    Trang Quản Trị
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
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <!-- Mobile menu button -->
          <div class="block md:hidden">
            <button
              @click="toggleMobileMenu"
              class="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
              <svg
                v-if="!isMobileMenuOpen"
                xmlns="http://www.w3.org/2000/svg"
                class="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu dropdown -->
      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >About</a
          >
          <a
            href="#"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >Careers</a
          >
          <a
            href="#"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >History</a
          >
          <a
            href="#"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >Services</a
          >
          <a
            href="#"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >Projects</a
          >
          <a
            href="#"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >Blog</a
          >

          <!-- Mobile user menu -->
          <div class="border-t border-gray-200 pt-4">
            <div class="flex items-center px-3">
              <div class="flex-shrink-0">
                <img
                  src="../../assets/images/gx-circle.png"
                  alt=""
                  class="size-8 rounded-full"
                />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">User Name</div>
                <div class="text-sm font-medium text-gray-500">
                  user@example.com
                </div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <RouterLink
                to="/user/profile"
                class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >My profile</RouterLink
              >
              <button
                @click="handleLogout"
                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-red-700 hover:bg-red-50"
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
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Cookie from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { RouterLink } from "vue-router";
import router from "@/router";

const isMobileMenuOpen = ref(false);

const authStore = useAuthStore();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
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
