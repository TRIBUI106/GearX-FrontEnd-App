<template>
  <div class="grid min-h-svh lg:grid-cols-2">
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div class="flex justify-center gap-2 md:justify-start">
        <RouterLink to="/" href="#" class="flex items-center gap-2 font-medium">
          <!-- <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd class-name="size-4" />
          </div> -->
          yeumedevs.
        </RouterLink>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-xs">
          <component :is="currentComponent" />
        </div>
      </div>
    </div>
    <div class="relative hidden bg-muted lg:block">
      <img
        src="../assets/images/old-london.jpg"
        alt="Image"
        class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import ForgotPasswordForm from "../components/ForgotPasswordForm.vue";

const route = useRoute();
const router = useRouter();

const mapModeToComponent = {
  login: LoginForm,
  signup: SignUpForm,
  forgot: ForgotPasswordForm,
} as const;

const currentComponent = computed(() => {
  const mode = String(route.params.mode || "login");
  if (!(mode in mapModeToComponent)) {
    router.replace({ name: "auth", params: { mode: "login" } });
    return LoginForm;
  }
  return mapModeToComponent[mode as keyof typeof mapModeToComponent];
});
</script>
