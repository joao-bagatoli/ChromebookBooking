<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCabinetStore } from '@/stores/cabinet'
import type { Cabinet } from '@/types/cabinet'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

import CabinetDialog from '@/components/settings/dialogs/CabinetDialog.vue'


const cabinetStore = useCabinetStore()

const dialogVisible = ref(false)
const selectedCabinet = ref<Cabinet | null>(null)

const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'isActive', header: 'Ativo' },
  { field: 'action', header: 'Ações' },
]

onMounted(async () => {
  await cabinetStore.getAllCabinets()
})

const editCabinet = (cabinet: Cabinet) => {
  selectedCabinet.value = { ...cabinet }
  dialogVisible.value = true
}

const handleDialogClose = () => {
  if (!dialogVisible.value) {
    selectedCabinet.value = null
  }
}
</script>

<template>
  <DataTable :value="cabinetStore.cabinets">
    <Column v-for="(col, index) in columns"
            :key="index"
            :field="col.field"
            :header="col.header">
      <template #body="slotProps">

        <template v-if="col.field === 'action'">
          <Button icon="pi pi-pencil"
                  severity="secondary"
                  text
                  rounded
                  @click="editCabinet(slotProps.data)" />
        </template>

        <template v-else-if="col.field === 'isActive'">
          {{ slotProps.data.isActive ? 'Sim' : 'Não' }}
        </template>

        <template v-else>
          {{ slotProps.data[col.field] }}
        </template>

      </template>
    </Column>
  </DataTable>

  <CabinetDialog v-model:visible="dialogVisible"
                 :cabinet="selectedCabinet"
                 @update:visible="handleDialogClose" />
</template>
