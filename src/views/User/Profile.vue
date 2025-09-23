<template>
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto justify-items-center">

    <img v-bind:src="avatarSrc" class="max-w-2xs my-20 rounded-full hover:opacity-70 hover:scale-110 duration-250">

      <form class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" class="w-full border rounded-lg px-3 py-2" v-model="user.email"  />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
          <input type="text" class="w-full border rounded-lg px-3 py-2" v-model="user.fullName" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          <input type="tel" class="w-full border rounded-lg px-3 py-2" v-model="user.phone"  />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
          <input type="text" class="w-full border rounded-lg px-3 py-2" v-model="user.address"  />
        </div>

        <div class="sm:col-span-2 flex justify-end gap-3 pt-2">
          <button type="button" class="border rounded-xl px-10 py-1">Huỷ</button>
          <button type="submit" class="bg-black text-white rounded-xl px-10 py-1">Lưu</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { type User } from '@/models/User'
import placeholderAvatar from '@/assets/images/placeholder.svg'

const user = ref<User>({
  userId: 0,
  username: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  fullName: '',
  createdAt: '',
  updatedAt: '',
  createdBy: '',
  updatedBy: '',
  isActive: 0,
  isDeleted: 0,
  avatarUrl: ''
})

const avatarSrc = computed(() => {
  const src = (user.value as any)?.avatarUrl
  return src && typeof src === 'string' && src.trim().length > 0 ? src : placeholderAvatar
})

onMounted(() => {
  const savedUser = localStorage.getItem("metadata")
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})

</script>
