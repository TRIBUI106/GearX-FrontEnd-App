import { createRouter, createWebHistory } from "vue-router";
import { checkToken } from "@/api/authApi";
import Cookie from 'js-cookie'

import Placeholder from "@/views/Placeholder.vue";
import Home from "@/views/Home.vue";
import MainLayout from "@/views/MainLayout.vue";

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
      children: [
        {
          path: "/home",
          name: "home",
          component: Home,
          meta: { requiresAuth: true },
        },
        {
          path: "/user/profile",
          name: "user-profile",
          component: () => import('../views/User/Profile.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: "/user/logout",
          name: "userLogout",
          component: () => import('../views/User/Logout.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },

  ],
});

router.beforeEach(async (to, from, next) => {
  const token = Cookie.get('token');
  let isAuthenticated = false;

  if (token) {
    try {
      isAuthenticated = await checkToken(token);
    } catch (err) {
      isAuthenticated = false;
    }
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    // chưa login | sau này đổi thành login, Placeholder là do chưa xong project
    next({ name: "Placeholder" });
  } else if (to.meta.guestOnly && isAuthenticated) {
    // đã login 
    next({ name: "main" });
  } else {
    next(); // ✅ cho đi bình thường
  }
});

export default router;
