<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import InputText from 'primevue/inputtext'
  import IconField from 'primevue/iconfield'
  import InputIcon from 'primevue/inputicon'
  import Badge from 'primevue/badge'
  import { FilterMatchMode } from '@primevue/core/api'
  import { useBookingStore } from '@/stores/booking'
  import { formatDate } from '@/utils/date'

  const bookingStore = useBookingStore()
  const loading = ref(false)

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })

  const fetchBookings = async () => {
    loading.value = true
    try {
      await bookingStore.fetchAll()
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchBookings()
  })
</script>

<template>
  <div>
    <header class="view-header">
      <h1 class="view-title">Histórico de Reservas</h1>
      <p class="view-subtitle">Consulte as reservas realizadas nos últimos 30 dias</p>
    </header>

    <div class="table-card">
      <DataTable v-model:filters="filters"
                 :value="bookingStore.allBookings"
                 :loading="loading"
                 dataKey="id"
                 :globalFilterFields="['teacherName', 'sectionName', 'classPeriodName']"
                 responsiveLayout="scroll"
                 stripedRows>
        <template #header>
          <div class="table-toolbar">
            <IconField iconPosition="left">
              <InputIcon class="pi pi-search" />
              <InputText v-model="filters.global.value"
                         placeholder="Buscar professor, turma, aula..."
                         class="search-input" />
            </IconField>
          </div>
        </template>

        <template #empty>
          <div class="empty-state">
            <i class="pi pi-inbox empty-icon" />
            <p>Nenhuma reserva encontrada.</p>
          </div>
        </template>

        <template #loading>
          <div class="loading-state">
            <i class="pi pi-spin pi-spinner loading-icon" />
            <p>Carregando dados das reservas...</p>
          </div>
        </template>

        <Column field="date" header="Data" sortable style="min-width: 120px;">
          <template #body="{ data }">
            {{ formatDate(data.date) }}
          </template>
        </Column>

        <Column field="classPeriodName" header="Aula" sortable style="min-width: 120px;" />

        <Column field="sectionName" header="Turma" sortable style="min-width: 130px;" />

        <Column field="teacherName" header="Professor" sortable style="min-width: 180px;" />

        <Column field="cabinetName" header="Gabinete" sortable style="min-width: 180px;" />

        <Column field="isPartial" header="Tipo" sortable style="min-width: 130px;">
          <template #body="{ data }">
            <Badge :value="data.isPartial ? 'Parcial' : 'Integral'"
                   :severity="data.isPartial ? 'warn' : 'info'" />
          </template>
        </Column>

        <Column field="chromebooksQuantity"
                header="Qtd. Chromebooks"
                sortable
                style="min-width: 160px; text-align: center;">
          <template #body="{ data }">
            <Badge :value="data.chromebooksQuantity ?? 0"
                   severity="secondary"
                   size="large" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
  .view-header {
    margin-bottom: 1.5rem;
  }

  .view-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    color: var(--surface-900, #0f172a);
  }

  .view-subtitle {
    font-size: 0.875rem;
    color: var(--surface-500, #64748b);
    margin: 0;
  }

  .table-card {
    background: var(--surface-card, #ffffff);
    border-radius: 8px;
    border: 1px solid var(--surface-border, #e2e8f0);
    overflow: hidden;
  }

  .search-input {
    width: 300px;
  }

  .empty-state,
  .loading-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--surface-500, #64748b);
  }

  .empty-icon,
  .loading-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  @media (max-width: 640px) {
    .search-input {
      width: 100%;
    }
  }
</style>
