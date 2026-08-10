<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useUserStore } from '@/stores/user'
  import DataTable from 'primevue/datatable'
  import Column, { type ColumnProps } from 'primevue/column'

  const userStore = useUserStore()

  const columns: ColumnProps[] = [
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Perfil' },
    { field: 'isActive', header: 'Ativo' }
  ]

  onMounted(async () => {
    await userStore.loadUsers()
  })
</script>

<template>
  <div class="users-container">
    <DataTable :value="userStore.users">
      <Column v-for="(col, index) in columns"
              :key="index"
              :field="col.field"
              :header="col.header">
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
</style>
