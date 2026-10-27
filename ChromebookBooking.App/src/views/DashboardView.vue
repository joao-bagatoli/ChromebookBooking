<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { useDashboardStore } from '../stores/dashboard'
  import Badge from 'primevue/badge'

  const dashboardStore = useDashboardStore()

  onMounted(() => {
    dashboardStore.getCabinetsOverview()
    dashboardStore.getTodayBookings()
  })

  const currentClassText = computed(() => {
    return dashboardStore.cabinetsOverview?.currentClassPeriod?.name || 'Carregando...'
  })

  const getCabinetStatusConfig = (status: string) => {
    switch (status) {
      case 'Available':
        return { label: 'Livre', severity: 'success', class: 'status-available' }
      case 'Booked':
        return { label: 'Em uso', severity: 'warn', class: 'status-booked' }
      case 'Inactive':
        return { label: 'Inativo', severity: 'secondary', class: 'status-inactive' }
      default:
        return { label: 'Desconhecido', severity: 'info', class: '' }
    }
  }

  // Calcula o total de gabinetes
  const totalCabinets = computed(() => {
    return dashboardStore.cabinetsOverview?.cabinets?.length || 5
  })

  // Agrupa as reservas pelo período da aula
  const groupedBookings = computed(() => {
    if (!dashboardStore.todayBookings) return []

    const groups = new Map<string, any>()

    dashboardStore.todayBookings.forEach((booking) => {
      const periodKey = booking.classPeriodName
      if (!groups.has(periodKey)) {
        groups.set(periodKey, {
          periodName: periodKey,
          periodId: booking.classPeriodId,
          bookings: []
        })
      }
      groups.get(periodKey).bookings.push(booking)
    })

    // Retorna ordenado pelo ID do período para aparecer na ordem certa (1ª, 2ª, 3ª aula)
    return Array.from(groups.values()).sort((a, b) => a.periodId - b.periodId)
  })
</script>

<template>
  <div class="dashboard-wrapper">
    <header class="page-header">
      <h1 class="view-title">Dashboard</h1>
      <p class="view-subtitle">Visão geral do uso atual dos Chromebooks</p>
    </header>

    <div v-if="dashboardStore.isLoadingOverview" class="loading-state">
      <i class="pi pi-spin pi-spinner loading-icon"></i>
      <p>Carregando visão geral...</p>
    </div>

    <template v-else>
      <section class="current-class-banner">
        <div class="icon-container">
          <i class="pi pi-book"
             :class="{ 'text-blue-500': dashboardStore.cabinetsOverview?.currentClassPeriod?.isClassTime }"></i>
        </div>
        <div class="class-info">
          <span class="label">Aula atual</span>
          <strong class="value">{{ currentClassText }}</strong>
        </div>
      </section>

      <section class="cabinets-grid">
        <div v-for="cabinet in dashboardStore.cabinetsOverview?.cabinets"
             :key="cabinet.id"
             class="cabinet-card"
             :class="getCabinetStatusConfig(cabinet.status).class">
          <div class="card-header">
            <div class="cabinet-name">
              <i class="pi pi-desktop"></i>
              <span>{{ cabinet.name }}</span>
            </div>
            <Badge :value="getCabinetStatusConfig(cabinet.status).label"
                   :severity="getCabinetStatusConfig(cabinet.status).severity" />
          </div>

          <div class="card-body">
            <p v-if="cabinet.status === 'Available'">Disponível para reserva</p>
            <p v-else-if="cabinet.status === 'Booked'">Reservado na aula atual</p>
            <p v-else>Gabinete desativado</p>
          </div>

          <div class="card-footer" v-if="cabinet.status === 'Available'">
            <small v-if="dashboardStore.cabinetsOverview?.currentClassPeriod?.isClassTime">
              Aguardando próxima reserva
            </small>
            <small v-else>
              Aguardando início das aulas
            </small>
          </div>
        </div>
      </section>

      <!-- Seção da Programação de Hoje -->
      <section class="schedule-section">
        <div class="schedule-card">
          <h3 class="schedule-title">Programação de hoje</h3>

          <div v-if="dashboardStore.isLoadingBookings" class="loading-state-small">
            <i class="pi pi-spin pi-spinner"></i> Carregando programação...
          </div>

          <div v-else class="schedule-list">

            <!-- Estado Vazio -->
            <div v-if="groupedBookings.length === 0" class="schedule-row empty-row">
              <div class="bookings-tags">
                <span class="empty-text">Nenhuma reserva agendada para hoje.</span>
              </div>
            </div>

            <!-- Iteração das reservas agrupadas -->
            <div v-for="group in groupedBookings"
                 :key="group.periodName"
                 class="schedule-row">

              <div class="period-info">
                <strong>{{ group.periodName }}</strong>
              </div>

              <div class="bookings-tags">
                <span v-for="booking in group.bookings"
                      :key="booking.id"
                      class="booking-tag">
                  <strong>{{ booking.cabinetName }}</strong> &mdash; {{ booking.teacherEmail.split('@')[0] }} &bull; {{ booking.sectionName }}
                </span>
              </div>

              <div class="capacity-info">
                <span class="fraction">{{ group.bookings.length }}/{{ totalCabinets }}</span>
              </div>

            </div>

          </div>

          <!--<div v-else class="schedule-list">-->
            <!-- Estrutura baseada no layout para iteração futura com os dados do back-end -->
            <!--<div class="schedule-row">
              <div class="period-info">
                <strong>1ª Aula</strong>
                <span>07:30 - 08:20</span>
              </div>
              <div class="bookings-tags">
                <span class="booking-tag">
                  <strong>Gabinete 1</strong> &mdash; Maria Silva &bull; 1ºA
                </span>
                <span class="booking-tag">
                  <strong>Gabinete 2</strong> &mdash; João Santos &bull; 1ºB
                </span>
                <span class="booking-tag">
                  <strong>Gabinete 3</strong> &mdash; Ana Oliveira &bull; 2ºA
                </span>
              </div>
              <div class="capacity-info">
                <span class="fraction">3/5</span>
              </div>
            </div>

            <div class="schedule-row">
              <div class="period-info">
                <strong>2ª Aula</strong>
                <span>08:20 - 09:10</span>
              </div>
              <div class="bookings-tags">
                <span class="booking-tag">
                  <strong>Gabinete 1</strong> &mdash; Maria Silva &bull; 2ºB
                </span>
              </div>
              <div class="capacity-info">
                <span class="fraction">1/5</span>
              </div>
            </div>

            <div class="schedule-row empty-row">
              <div class="period-info">
                <strong>3ª Aula</strong>
                <span>09:30 - 10:20</span>
              </div>
              <div class="bookings-tags">
                <span class="empty-text">Nenhuma reserva</span>
              </div>
              <div class="capacity-info">
                <span class="fraction">0/5</span>
              </div>
            </div>

            <div class="schedule-row empty-row">
              <div class="period-info">
                <strong>4ª Aula</strong>
                <span>10:20 - 11:10</span>
              </div>
              <div class="bookings-tags">
                <span class="empty-text">Nenhuma reserva</span>
              </div>
              <div class="capacity-info">
                <span class="fraction">0/5</span>
              </div>
            </div>
          </div>-->


        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
  .dashboard-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .page-header {
    margin-bottom: 0.5rem;
  }

  .view-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--surface-900, #0f172a);
    margin: 0 0 0.25rem 0;
  }

  .view-subtitle {
    font-size: 0.95rem;
    color: var(--surface-500, #64748b);
    margin: 0;
  }

  .current-class-banner {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: var(--surface-card, #ffffff);
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid var(--surface-border, #e2e8f0);
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: var(--surface-100, #f1f5f9);
    color: var(--surface-500, #64748b);
    border-radius: 10px;
    font-size: 1.5rem;
    transition: all 0.2s ease;
  }

    .icon-container:has(.text-blue-500) {
      background-color: #eff6ff;
      color: #3b82f6;
    }

  .class-info {
    display: flex;
    flex-direction: column;
  }

    .class-info .label {
      font-size: 0.85rem;
      color: var(--surface-500, #64748b);
      margin-bottom: 0.2rem;
    }

    .class-info .value {
      font-size: 1.1rem;
      color: var(--surface-900, #0f172a);
    }

  .cabinets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  .cabinet-card {
    background: var(--surface-card, #ffffff);
    border: 1px solid var(--surface-border, #e2e8f0);
    border-radius: 10px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: all 0.2s ease;
  }

  .status-available {
    background-color: #f8fafc;
    border-color: #bbf7d0;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cabinet-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: var(--surface-900, #0f172a);
  }

  .card-body p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--surface-600, #475569);
  }

  .card-footer {
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid var(--surface-border, #e2e8f0);
  }

    .card-footer small {
      color: var(--surface-400, #94a3b8);
    }

  /* --- Estilos da Programação de Hoje --- */
  .schedule-section {
    margin-top: 0.5rem;
  }

  .schedule-card {
    background: var(--surface-card, #ffffff);
    border: 1px solid var(--surface-border, #e2e8f0);
    border-radius: 12px;
    overflow: hidden;
  }

  .schedule-title {
    padding: 1.25rem 1.5rem;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    border-bottom: 1px solid var(--surface-border, #e2e8f0);
    color: var(--surface-900, #0f172a);
  }

  .schedule-list {
    display: flex;
    flex-direction: column;
  }

  .schedule-row {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--surface-border, #e2e8f0);
    gap: 1.5rem;
  }

    .schedule-row:last-child {
      border-bottom: none;
    }

  .period-info {
    display: flex;
    flex-direction: column;
    min-width: 110px;
  }

    .period-info strong {
      font-size: 0.95rem;
      color: var(--surface-900, #0f172a);
    }

    .period-info span {
      font-size: 0.8rem;
      color: var(--surface-500, #64748b);
      margin-top: 0.2rem;
    }

  .bookings-tags {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .booking-tag {
    background-color: var(--surface-100, #f1f5f9);
    color: var(--surface-700, #334155);
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
  }

  .empty-text {
    color: var(--surface-400, #94a3b8);
    font-size: 0.9rem;
  }

  .capacity-info .fraction {
    font-size: 0.85rem;
    color: var(--surface-500, #64748b);
  }

  /* Loadings */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    color: var(--surface-500, #64748b);
    gap: 1rem;
  }

  .loading-icon {
    font-size: 2rem;
  }

  .loading-state-small {
    padding: 2rem;
    text-align: center;
    color: var(--surface-500, #64748b);
  }

  @media (max-width: 768px) {
    .schedule-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .capacity-info {
      align-self: flex-end;
    }
  }
</style>
