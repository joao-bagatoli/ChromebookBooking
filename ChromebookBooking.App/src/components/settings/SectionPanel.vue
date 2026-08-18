<script setup lang="ts">
import { onMounted } from 'vue'
import { useSectionStore } from '@/stores/section'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

const sectionStore = useSectionStore()

function editSection(data: any) {
  console.log('Edit section', data)
}

onMounted(async () => {
  await sectionStore.loadSections()
})
</script>

<template>
  <div>
    <DataTable :value="sectionStore.sections">
      <Column field="name" header="Turma"></Column>

      <Column header="Ações">
        <template #body="{ data }">
          <Button icon="pi pi-pencil"
                  text
                  rounded
                  severity="secondary"
                  arial-label="Editar"
                  title="Editar"
                  @click="editSection(data)">
          </Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
</style>
