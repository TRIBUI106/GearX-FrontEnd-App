<template>
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto justify-items-center">

    <img src="../../assets/images/placeholder.svg" class="max-w-2xs my-20 rounded-full hover:opacity-70 hover:scale-110 duration-250">

      <form class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" class="w-full border rounded-lg px-3 py-2" v-model="user.email"  />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
          <input type="text" class="w-full border rounded-lg px-3 py-2" v-model="user.full_name" />
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
import { ref, onMounted } from 'vue';
import { type User } from '@/models/User'

const user = ref<User>({
  user_id: 0,
  username: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  full_name: '',
  created_at: '',
  updated_at: '',
  created_by: '',
  updated_by: '',
  is_active: 0,
  is_deleted: 0,
  avatar_url: ''
})

onMounted(() => {
  const savedUser = localStorage.getItem("metadata")
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})

</script>
