<script setup lang="ts">
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import { useBookingStore } from '@/stores/booking'
  import { onMounted } from 'vue'

  const bookingStore = useBookingStore()

  onMounted(async () => {
    await bookingStore.getBookings()
  })
</script>

<template>
  <div>
    <h1 class="view-title">Histórico de Reservas</h1>
    <p class="view-subtitle">Consulte as reservas realizadas nos últimos 30 dias</p>
  </div>
  <div>
    <DataTable :value="bookingStore.bookings">
      <Column field="date" header="Data"></Column>
      <Column field="classPeriodName" header="Aula"></Column>
      <!--<Column field="cabinetName" header="Gabinete"></Column>-->
      <Column field="sectionName" header="Turma"></Column>
      <Column field="teacherName" header="Professor"></Column>
      <Column field="isPartial" header="Parcial"></Column>
      <Column field="chromebooksQuantity" header="Qtd Chromebooks"></Column>
    </DataTable>
  </div>
</template>

<style scoped>
</style>
