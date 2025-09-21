<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <form :class="cn('flex flex-col gap-6', props.class)">
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
    <Label for="fullname">Fullname</Label>
    <Input id="fullname" type="fullname" required />
    </div>

      <div class="grid gap-3">
        <Label for="username">Username</Label>
        <Input id="username" type="username" required />
      </div>

      <div class="grid gap-3">
        <div class="flex items-center">
          <Label for="password">Password</Label>
        </div>
        <Input id="password" type="password" required />
      </div>
      
      <div class="grid gap-3">
        <div class="flex items-center">
          <Label for="password">Confirm Password</Label>
        </div>
        <Input id="password" type="password" required />
      </div>
      
      <div class="grid gap-3">
        <div class="flex items-center">
          <Label for="email">Email</Label>
        </div>
        <Input id="email" type="email" required />
      </div>
      
      <div class="grid gap-3">
        <div class="flex items-center">
          <Label for="phonenumber">Phone Number</Label>
        </div>
        <Input id="phonenumber" type="phonenumber" required />
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
