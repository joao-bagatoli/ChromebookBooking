<script setup lang="ts">
  import { useAuthStore } from "../stores/useAuthStore"
  import BaseButton from '../components/ui/BaseButton.vue'

  const authStore = useAuthStore()
</script>

<template>
  <BaseButton v-if="!authStore.user" @click="authStore.loginWithGoogle" label="Entrar com Google" />
  <BaseButton v-else @click="authStore.logout" label="Sair" />
</template>

<style scoped>

</style>
