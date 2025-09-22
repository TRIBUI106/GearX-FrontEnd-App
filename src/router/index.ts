import { createRouter, createWebHistory } from "vue-router";
import { checkToken } from "@/api/authApi";
import Cookie from 'js-cookie'

import Placeholder from "@/views/Placeholder.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
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
      path: "/login",
      name: "login",
      component: Login,
      meta: { guestOnly: true }, // chặn nếu đã login
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      meta: { guestOnly: true },
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
    // chưa login 
    next({ name: "login" });
  } else if (to.meta.guestOnly && isAuthenticated) {
    // đã login 
    next({ name: "main" });
  } else {
    next(); // ✅ cho đi bình thường
  }
});

export default router;
