<script setup lang="ts">
  import { computed } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import AppSidebar from './AppSidebar.vue'
  import AppAvatar from './AppAvatar.vue'

  const authStore = useAuthStore()

  const isAdmin = computed(() => authStore.profile?.role === 'Admin')
</script>

<template>
  <div class="layout-wrapper">
    <AppSidebar v-if="isAdmin" />
    <div class="main-content">
      <AppAvatar />
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
  .layout-wrapper {
      display: flex;
      min-height: 100vh;
      width: 100%;
  }

  .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background-color: var(--p-surface-50);
      padding: 1.5rem;
  }
</style>
