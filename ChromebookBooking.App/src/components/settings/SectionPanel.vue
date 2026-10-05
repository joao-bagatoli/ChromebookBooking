<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useSectionStore } from '@/stores/section'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const props = defineProps<{
    search: string
}>()

const sectionStore = useSectionStore()

const emit = defineEmits(['edit'])

function getSectionStatus(isActive: boolean) {
  return isActive ? 'Ativa' : 'Inativa'
}

function getSectionStatusSeverity(isActive: boolean) {
  return isActive ? 'success' : 'danger'
}

function onEditSection(data: any) {
  emit('edit', data)
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
          <Button icon="pi pi-pencil"
                  text
                  rounded
                  severity="secondary"
                  arial-label="Editar"
                  title="Editar"
                  @click="onEditSection(data)">
          </Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
</style>
