<template>
  <form :class="cn('flex flex-col gap-6', props.class)" @submit.prevent="signupHandler()">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">
        SignUp new account
      </h1>
      <p class="text-muted-foreground text-sm text-balance">
        Fill your information below to countinue the process
      </p>
    </div>
    <div class="grid gap-6">


      <div class="grid gap-3">
        <Label for="username">Username</Label>
        <Input id="username" type="username" v-model="user.username" required />
      </div>

      <div class="grid gap-3">
        <div class="flex items-center">
          <Label for="password">Password</Label>
        </div>
        <Input id="password" type="password" v-model="user.password" required />
      </div>
      
      <div class="grid gap-3">
        <div class="flex items-center">
          <Label for="repassword">Confirm Password</Label>
        </div>
        <Input id="repassword" type="password" v-model="repass" required />
      </div>
      
      <div class="grid gap-3">
        <div class="flex items-center">
          <Label for="email">Email</Label>
        </div>
        <Input id="email" type="email" v-model="user.email" required />
      </div>

      <Button type="submit" class-name="w-full">
        Sign Up
      </Button>

    </div>
    <div class="text-center text-sm">
      Already have an account?
      <RouterLink to="login" href="#" class="underline underline-offset-4">
        Login
      </RouterLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from "vue-sonner"
import { authRegister } from "@/api/authApi"
import router from "@/router"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const user = ref({
  username: "",
  email: "",
  password: "",
})
const repass = ref('')

const signupHandler = async () => {
  try {
    if ( repass.value.localeCompare(user.value.password) != 0 ) {
      toast.error('Mật khẩu không khớp !')
      return;
    }
    
    const res = await authRegister(user.value)
    console.log(res.message)

    if ( res.success ) {
      toast.success('Tạo tài khoản thành công !Trở về trang đăng nhập sau 5s')
      setTimeout(() => {
        window.location.href='/login'
      }, 5000);
      return;
    } 

    toast.error(res.message)

  } catch (err: any) {
    console.log('Signup error:', err)
    
    // Handle specific error messages from backend
    const errorMessage = err.response?.data?.message || err.message || 'Đăng ký thất bại'
    
    // Check for specific error types
    if (errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('exist')) {
      toast.error('Email này đã được sử dụng. Vui lòng chọn email khác.')
    } else if (errorMessage.toLowerCase().includes('username') && errorMessage.toLowerCase().includes('exist')) {
      toast.error('Tên người dùng này đã tồn tại. Vui lòng chọn tên khác.')
    } else {
      toast.error(errorMessage)
    }
  }
}

</script>