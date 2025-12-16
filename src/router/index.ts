import { createRouter, createWebHistory } from "vue-router";
import { checkToken } from "@/api/authApi";
import { useAuthStore } from "@/stores/authStore";
import Cookie from 'js-cookie'

import Placeholder from "@/views/Placeholder.vue";
import Home from "@/views/Home.vue";
import MainLayout from "@/views/MainLayout/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // Home
    {
      path: "/developing",
      name: "Placeholder",
      component: Placeholder,
    },
    {
      path: '/auth/:mode(login|signup|forgot)',
      name: 'auth',
      component: () => import('../views/Auth.vue'),
      props: true,
      meta: { guestOnly: true }, // chặn nếu đã login
    },
    {
      path: '/auth',
      redirect: { name: 'auth', params: { mode: 'login' } },
    },
    {
      path: '/login',
      redirect: { name: 'auth', params: { mode: 'login' } },
    },
    {
      path: "/",
      name: "main",
      component: MainLayout,
      meta: { requiresAuth: true },
      redirect: { name: 'home' },
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
          meta: { requiresAuth: true },
        },
        {
          path: "user/profile",
          name: "user-profile",
          component: () => import('@/views/User/Profile.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: "user/logout",
          name: "userLogout",
          component: () => import('@/views/User/Logout.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: "product/:id",
          name: "product-detail",
          component: () => import('@/views/ProductDetail.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: "admin",
          name: "admin-dashboard",
          component: () => import('@/views/Admin/Dashboard.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        }
      ]
    },

  ],
});

router.beforeEach(async (to, from, next) => {
  const token = Cookie.get('token');
  const authStore = useAuthStore();
  let isAuthenticated = false;

  if (token) {
    try {
      isAuthenticated = await checkToken(token);
      // Load role from storage if not already loaded
      if (isAuthenticated && authStore.role === null) {
        authStore.loadFromStorage();
      }
    } catch (err) {
      isAuthenticated = false;
    }
  }

  // Check authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Placeholder" });
    return;
  }

  // Check guest only routes
  if (to.meta.guestOnly && isAuthenticated) {
    next({ name: "main" });
    return;
  }

  // Check admin access
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    console.warn('Access denied: Admin role required');
    next({ name: "home" }); // Redirect to home if not admin
    return;
  }

  next(); // ✅ Allow navigation
});

export default router;
