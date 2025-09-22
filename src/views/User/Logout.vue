<template>

</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';
import Cookie from 'js-cookie'


const authStore = useAuthStore()

onMounted(() => {
    const token = Cookie.get('token')
    if ( token ) {
        authStore.logout(token)
    }
})

</script>