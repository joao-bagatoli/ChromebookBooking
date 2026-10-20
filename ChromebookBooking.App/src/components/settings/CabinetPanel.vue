<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useCabinetStore } from '@/stores/cabinet'
import type { Cabinet } from '@/types/cabinet'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import CabinetDialog from '@/components/settings/dialogs/CabinetDialog.vue'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  search: string
}>()

const cabinetStore = useCabinetStore()
const dialogVisible = ref(false)
const selectedCabinet = ref<Cabinet | null>(null)

const toast = useToast()

const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'isActive', header: 'Status' },
  { field: 'action', header: 'Ações' }
]

function getCabinetStatus(isActive: boolean) {
  return isActive ? 'Ativo' : 'Inativo'
}

function getCabinetStatusSeverity(isActive: boolean) {
  return isActive ? 'success' : 'danger'
}

const filteredCabinets = computed(() => {
  const query = props.search.toLowerCase()
  if (!query) return cabinetStore.cabinets
  return cabinetStore.cabinets.filter((cabinet) => {
    return cabinet.name.toLowerCase().includes(query)
  })
})

onMounted(async () => {
  await cabinetStore.getAllCabinets()
})

const editCabinet = (cabinet: Cabinet) => {
  selectedCabinet.value = { ...cabinet }
  dialogVisible.value = true
}

const deleteCabinet = async (cabinet: Cabinet) => {
  try {
    await cabinetStore.deleteCabinet(cabinet.id)
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Gabinete deletado com sucesso!',
      life: 3000
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível deletar o gabinete.',
      life: 3000
    })
  }
}

const handleDialogClose = () => {
  if (!dialogVisible.value) {
    selectedCabinet.value = null
  }
}
</script>

<template>
  <div class="table-container">
    <!-- Componente Toast posicionado no canto inferior direito -->
    <Toast position="bottom-right" />

    <DataTable :value="filteredCabinets"
               responsiveLayout="scroll"
               class="custom-table">
      <Column v-for="(col, index) in columns"
              :key="index"
              :field="col.field"
              :header="col.header">
        <template #body="slotProps">
          <template v-if="col.field === 'action'">
            <div class="table-actions">
              <Button icon="pi pi-pencil"
                      severity="secondary"
                      text
                      rounded
                      @click="editCabinet(slotProps.data)" />
              <Button icon="pi pi-trash"
                      severity="danger"
                      text
                      rounded
                      @click="deleteCabinet(slotProps.data)" />
            </div>
          </template>

          <template v-else-if="col.field === 'isActive'">
            <Tag :value="getCabinetStatus(slotProps.data.isActive)"
                 :severity="getCabinetStatusSeverity(slotProps.data.isActive)"
                 rounded>
            </Tag>
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
  </div>
</template>

<style scoped>
  .table-container {
    width: 100%;
    overflow-x: auto;
  }
</style>
