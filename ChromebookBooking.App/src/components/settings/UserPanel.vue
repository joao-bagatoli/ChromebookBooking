<script setup lang="ts">
  import { onMounted, computed, ref } from 'vue'
  import { useUserStore } from '@/stores/user'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Tag from 'primevue/tag'
  import Button from 'primevue/button'
  import { getRoleSeverity, getRoleLabel } from '../../utils/userUtils'
  import { useToast } from 'primevue/usetoast'

  const props = defineProps<{
    search: string
  }>()

  const userStore = useUserStore()
  const toast = useToast()

  const emit = defineEmits(['edit'])

  const loading = ref(true)

  function getUserStatus(isActive: boolean) {
    return isActive ? 'Ativo' : 'Inativo'
  }

  function getUserStatusSeverity(isActive: boolean) {
    return isActive ? 'success' : 'danger'
  }

  function onEditUser(data: any) {
    emit('edit', data)
  }

  async function onDeleteUser(data: any) {
    toast.add({
      severity: 'info',
      summary: 'Aguarde',
      detail: 'Deletando o usuário...',
      life: 2000
    })

    try {
      await userStore.deleteUser(data.id)
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário deletado com sucesso!',
        life: 3000
      })
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível deletar o usuário.',
        life: 3000
      })
    }
  }

  const filteredUsers = computed(() => {
    const query = props.search.toLowerCase()
    if (!query) return userStore.users
    return userStore.users.filter((user) => {
      return user.email.toLowerCase().includes(query) || getRoleLabel(user.role).toLowerCase().includes(query)
    })
  })

  onMounted(async () => {
    loading.value = true
    try {
      await userStore.loadUsers()
    } finally {
      loading.value = false
    }
  })
</script>

<template>
  <div>
    <DataTable :value="filteredUsers" :loading="loading">
      <Column field="name" header="Nome"></Column>

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
          <div class="table-actions">
            <Button icon="pi pi-pencil"
                    text
                    rounded
                    severity="secondary"
                    arial-label="Editar"
                    title="Editar"
                    @click="onEditUser(data)">
            </Button>
            <Button icon="pi pi-trash"
                    text
                    rounded
                    severity="danger"
                    arial-label="Excluir"
                    title="Excluir"
                    @click="onDeleteUser(data)">
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
