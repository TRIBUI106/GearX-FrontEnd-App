<template>

</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';


const authStore = useAuthStore()

onMounted(() => {
    const token = localStorage.getItem('token')
    if ( token ) {
        authStore.logout(token)
    }
})

</script>