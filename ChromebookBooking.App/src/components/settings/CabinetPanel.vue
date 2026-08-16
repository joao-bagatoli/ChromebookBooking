<script setup lang="ts">
import { onMounted } from 'vue';
import { useCabinetStore } from '@/stores/cabinet';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button'; 

const cabinetStore = useCabinetStore();

const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'isActive', header: 'Ativo' },
  { field: 'action', header: 'Ações' },
];

onMounted(async () => {
  await cabinetStore.getAllCabinets();
});

const editCabinet = (data: any) => {
  console.log('Editar item:', data);
};
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

        <template v-else>
          {{ slotProps.data[col.field] }}
        </template>
      </template>
    </Column>
  </DataTable>
</template>
