<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { useUserStore } from '@/stores/user'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Tag from 'primevue/tag'
  import Button from 'primevue/button'
  import { getRoleSeverity, getRoleLabel } from '../../utils/userUtils'

  const props = defineProps<{
    search: string
  }>()

  const userStore = useUserStore()

  const emit = defineEmits(['edit'])

  function getUserStatus(isActive: boolean) {
    return isActive ? 'Ativo' : 'Inativo'
  }

  function getUserStatusSeverity(isActive: boolean) {
    return isActive ? 'success' : 'danger'
  }

  function onEditUser(data: any) {
    emit('edit', data)
  }

  const filteredUsers = computed(() => {
    const query = props.search.toLowerCase()
    if (!query) return userStore.users
    return userStore.users.filter((user) => {
        return user.email.toLowerCase().includes(query) || getRoleLabel(user.role).toLowerCase().includes(query)
    })
  })

  onMounted(async () => {
    await userStore.loadUsers()
  })
</script>

<template>
  <div>
    <DataTable :value="filteredUsers">
      <Column field="email" header="E-mail"></Column>

      <Column field="role" header="Perfil">
        <template #body="{ data }">
          <Tag :value="getRoleLabel(data.role)"
               :severity="getRoleSeverity(data.role)"
               rounded>
          </Tag>
        </template>
      </Column>

      <Column field="isActive" header="Status">
        <template #body="{ data }">
          <Tag :value="getUserStatus(data.isActive)"
               :severity="getUserStatusSeverity(data.isActive)"
               rounded>
          </Tag>
        </template>
      </Column>

      <Column header="Ações">
        <template #body="{ data }">
          <Button icon="pi pi-pencil"
                  text
                  rounded
                  severity="secondary"
                  arial-label="Editar"
                  title="Editar"
                  @click="onEditUser(data)">
          </Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
</style>
