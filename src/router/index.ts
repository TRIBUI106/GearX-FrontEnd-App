import { createRouter, createWebHistory } from "vue-router";
import { checkToken } from "@/api/authApi";

import Placeholder from "@/views/Placeholder.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/User/Profile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // Home
    {
      path: "/",
      name: "Placeholder",
      component: Placeholder,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { guestOnly: true }, // 🚫 chặn nếu đã login
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      meta: { guestOnly: true },
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },

    // user
    {
      path: "/user/profile",
      name: "userProfile",
      component: Profile,
      meta: { requiresAuth: true }, // ✅ cần login
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  let isAuthenticated = false;

  if (token) {
    try {
      isAuthenticated = await checkToken(token);
    } catch (err) {
      isAuthenticated = false;
    }
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 🚫 chưa login mà đòi vào trang cần login
    next({ name: "login" });
  } else if (to.meta.guestOnly && isAuthenticated) {
    // 🚫 đã login mà đòi vào login/signup
    next({ name: "home" });
  } else {
    next(); // ✅ cho đi bình thường
  }
});

export default router;
