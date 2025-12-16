<template>
    <form
      :class="cn('flex flex-col gap-6', props.class)"
      @submit.prevent="hihi()"
    >
      <div class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-bold">Forgot Password</h1>
        <p class="text-muted-foreground text-sm text-balance" v-if="!isSendOtpSuccess">
          Enter your email below to request a forgot password email to your account
        </p>
        <p class="text-muted-foreground text-sm text-balance" v-else>
          Enter your OTP has sent to your email below
        </p>
      </div>
      <div class="grid gap-6">
        <div class="grid gap-3" v-if="!isSendOtpSuccess">
          <Label for="Email">Email</Label>
          <Input id="Email" type="Email" required v-model="req.email" placeholder="abc123@mail.com" />
        </div>
        <div class="grid gap-3" v-else>
          <Label for="OTP">OTP</Label>
          <Input id="OTP" type="text" required v-model="req.otp" placeholder="000000" />
          <Input id="newPassword" type="password" required v-model="req.newPassword" placeholder="********" />
        </div>
        <Button v-if="!isSendOtpSuccess" @click="requestForgotPasswordHandler()" type="submit" class-name="w-full" :disabled="isSubmitting" > Submit </Button>
        <Button v-else @click="resetPasswordHandler()" class-name="w-full" :disabled="isSubmitting" > Reset Password </Button>
        
      </div>
      <div class="text-center text-sm">
        <RouterLink to="login" href="#" class="underline underline-offset-4">Back to Login page</RouterLink>
      </div>
    </form>
  </template>
  
<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendOtp, resetPassword } from "@/api/authApi";
import { toast } from "vue-sonner";
import router from "@/router";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const req = ref({
  email: '',
  otp: '',
  newPassword: ''
})
const isSubmitting = ref(false)
const isSendOtpSuccess = ref(false)

const hihi = () => {

}

const requestForgotPasswordHandler = async () => {
  isSubmitting.value = true
  try {
    const res = await sendOtp(req.value.email)
    console.log(res)
    const message = res.data.data || res.data.message  
    toast.info(message)
    isSendOtpSuccess.value = true
  } catch(err : any) {
    console.log(err)
    toast.error(err.response?.data?.data)
  }

  isSubmitting.value = false
}

const resetPasswordHandler = async () => {
  isSubmitting.value = true

  try {
    const res = await resetPassword(req.value)
    if ( res ) {
      if ( res.data.success ) {
        window.location.href="/auth/login"
        toast.success(res.data.message)
      }
    }
  } catch ( err : any ) {
    console.log(err)
    toast.error(err.response?.data?.data || err.response?.data?.message)
  }

  isSubmitting.value = false  
}


</script>
  