<script setup lang="ts">
import { onMounted, computed } from 'vue'
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

function getSectionStatus(isActive: boolean) {
  return isActive ? 'Ativa' : 'Inativa'
}

function getSectionStatusSeverity(isActive: boolean) {
  return isActive ? 'success' : 'danger'
}

function onEditSection(data: any) {
  emit('edit', data)
}

async function onDeleteSection(data: any) {
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
  await sectionStore.loadSections()
})
</script>

<template>
  <div>
    <DataTable :value="filteredSections">
      <Column field="name" header="Turma"></Column>

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
                    arial-label="Editar"
                    title="Editar"
                    @click="onEditSection(data)">
            </Button>
            <Button icon="pi pi-trash"
                    text
                    rounded
                    severity="danger"
                    arial-label="Excluir"
                    title="Excluir"
                    @click="onDeleteSection(data)">
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
</style>
