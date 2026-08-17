<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCabinetStore } from '@/stores/cabinet'
import type { Cabinet } from '@/types/cabinet'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast' // Import do Toast
import CabinetDialog from '@/components/settings/dialogs/CabinetDialog.vue'

const cabinetStore = useCabinetStore()
const dialogVisible = ref(false)
const selectedCabinet = ref<Cabinet | null>(null)

const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'isActive', header: 'Status' },
  { field: 'action', header: 'Ações' }
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
  <div class="table-container">
    <!-- Componente Toast posicionado no canto inferior direito -->
    <Toast position="bottom-right" />

    <DataTable :value="cabinetStore.cabinets"
               responsiveLayout="scroll"
               class="custom-table">
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
            <span class="status-badge"
                  :class="slotProps.data.isActive ? 'active' : 'inactive'">
              {{ slotProps.data.isActive ? 'Ativo' : 'Inativo' }}
            </span>
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

  .status-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1;
  }

    .status-badge.active {
      background-color: #e8f8f0;
      color: #22c55e;
    }

    .status-badge.inactive {
      background-color: #fde8e8;
      color: #ef4444;
    }

  :deep(.p-datatable-tbody > tr > td) {
    padding: 1rem 0.75rem;
  }

  @media (max-width: 640px) {
    :deep(.p-datatable-tbody > tr > td) {
      padding: 0.75rem 0.5rem;
      font-size: 0.9rem;
    }
  }
</style>
