<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import Button from 'primevue/button'

  const authStore = useAuthStore()
  const modules = authStore.profile?.modules || []

  const isCollapsed = ref(false)

  function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value
  }

  const moduleConfig: Record<string, { label: string, icon: string }> = {
    Dashboard: { label: 'Início', icon: 'pi pi-home' },
    Schedule: { label: 'Agenda', icon: 'pi pi-calendar' },
    History: { label: 'Histórico', icon: 'pi pi-history' },
    Settings: { label: 'Configurações', icon: 'pi pi-cog' }
  }

  const menuItems = computed(() => {
    return modules.map(module => {
      const config = moduleConfig[module]
      return {
        route: module,
        label: config?.label,
        icon: config?.icon
      }
    })
  })
</script>

<template>
  <aside class="app-sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <i class="pi pi-desktop header-icon" title="Reservas Chromebooks"></i>
      <span v-show="!isCollapsed" class="header-label">Reserva de Chromebooks</span>
    </div>
    <nav class="sidebar-content">
      <RouterLink v-for="item in menuItems"
                  :key="item.route"
                  :to="{ name: item.route }"
                  class="nav-link"
                  :class="{ 'nav-link-collapsed': isCollapsed }"
                  active-class="active-link"
                  :title="isCollapsed ? item.label : undefined">
        <i :class="item.icon" class="nav-icon"></i>
        <span v-show="!isCollapsed" class="nav-label">{{ item.label }}</span>
      </RouterLink>
    </nav>
    <div class="sidebar-footer">
      <Button :icon="isCollapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'"
              severity="secondary"
              text
              rounded
              aria-label="Toggle Sidebar"
              :pt="{
                icon: { style: 'font-size: 0.75rem;' }
              }"
              @click="toggleCollapse">
      </Button>
    </div>
  </aside>
</template>

<style scoped>
  .app-sidebar {
      width: 240px;
      background-color: var(--p-surface-0);
      border-right: 1px solid var(--p-surface-200);
      display: flex;
      flex-direction: column;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
  }

    .app-sidebar.sidebar-collapsed {
        width: 64px;
    }

  .sidebar-header {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      border-bottom: 1px solid var(--p-surface-100);
      gap: 0.75rem;
  }

  .header-icon {
      font-size: 1.25rem;
  }

  .header-label {
      font-size: var(--font-base);
      font-weight: 500;
  }

  .sidebar-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem 0.5rem;
      overflow-y: auto;
      overflow-x: hidden;
  }

  .nav-link {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      text-decoration: none;
      transition: background-color 0.2s, color 0.2s;
      white-space: nowrap;
      outline: none;
      gap: 0.75rem;
      color: var(--p-surface-600);
  }

    .nav-link:hover {
        background-color: var(--p-surface-100);
    }

  .nav-link-collapsed {
      padding-left: 0;
      padding-right: 0;
      justify-content: center;
  }

  .active-link {
      background-color: var(--p-primary-50);
      color: var(--p-primary-700);
      font-weight: 600;
  }

  .nav-icon {
      font-size: 1.25rem;
      min-width: 24px;
      display: flex;
      justify-content: center;
  }

  .nav-label {
      font-size: var(--font-base);
      transition: opacity 0.2s;
  }

  .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid var(--p-surface-100);
      display: flex;
      justify-content: center;
  }

  .collapse-icon {
      font-size: 1rem !important;
  }
</style>
