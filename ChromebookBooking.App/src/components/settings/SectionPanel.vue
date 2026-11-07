<script setup lang="ts">
  import { onMounted, computed, ref } from 'vue'
  import { useSectionStore } from '@/stores/section'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Button from 'primevue/button'
  import Tag from 'primevue/tag'
  import { useToast } from 'primevue/usetoast'

  const props = defineProps<{
    search: string
  }>()

  const sectionStore = useSectionStore()
  const emit = defineEmits(['edit'])
  const toast = useToast()

  const loading = ref(true)

  function getSectionStatus(isActive: boolean) {
    return isActive ? 'Ativa' : 'Inativa'
  }

  function getSectionStatusSeverity(isActive: boolean) {
    return isActive ? 'success' : 'danger'
  }

  function getShiftLabel(shift: string) {
    if (shift === 'Morning') return 'Matutino'
    if (shift === 'Afternoon') return 'Vespertino'
    return 'Não definido'
  }

  function getShiftSeverity(shift: string) {
    if (shift === 'Morning') return 'info'
    if (shift === 'Afternoon') return 'warn'
    return 'secondary'
  }

  function onEditSection(data: any) {
    emit('edit', data)
  }

  async function onDeleteSection(data: any) {
    toast.add({
      severity: 'info',
      summary: 'Aguarde',
      detail: 'Deletando a turma...',
      life: 2000
    })

    try {
      await sectionStore.deleteSection(data.id)
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Turma deletada com sucesso!',
        life: 3000
      })
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível deletar a turma.',
        life: 3000
      })
    }
  }

  const filteredSections = computed(() => {
    const query = props.search.toLowerCase()
    if (!query) return sectionStore.sections
    return sectionStore.sections.filter((section) => {
      return section.name.toLowerCase().includes(query)
    })
  })

  onMounted(async () => {
    loading.value = true
    try {
      await sectionStore.loadSections()
    } finally {
      loading.value = false
    }
  })
</script>

<template>
  <div>
    <DataTable :value="filteredSections" :loading="loading">

      <template #empty>
        Nenhuma turma encontrada.
      </template>

      <Column field="name" header="Turma"></Column>

      <Column field="shift" header="Turno">
        <template #body="{ data }">
          <Tag v-if="data.shift"
               :value="getShiftLabel(data.shift)"
               :severity="getShiftSeverity(data.shift)"
               rounded>
          </Tag>
          <span v-else class="text-gray-500">-</span>
        </template>
      </Column>

      <Column field="isActive" header="Status">
        <template #body="{ data }">
          <Tag :value="getSectionStatus(data.isActive)"
               :severity="getSectionStatusSeverity(data.isActive)"
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
                    aria-label="Editar"
                    title="Editar"
                    @click="onEditSection(data)">
            </Button>
            <Button icon="pi pi-trash"
                    text
                    rounded
                    severity="danger"
                    aria-label="Excluir"
                    title="Excluir"
                    @click="onDeleteSection(data)">
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
