<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import Button from 'primevue/button'

  const router = useRouter()

  const goBack = () => {
    router.back()
  }
</script>

<template>
  <div class="denied-wrapper">
    <div class="denied-content">
      <div class="icon-container">
        <i class="pi pi-lock"></i>
      </div>

      <h1 class="title">Acesso Negado</h1>
      <p class="subtitle">
        Você não tem permissão para visualizar esta página. <br />
        Verifique suas credenciais ou contate o administrador do sistema.
      </p>

      <Button label="Voltar"
              icon="pi pi-arrow-left"
              @click="goBack"
              class="action-button" />
    </div>
  </div>
</template>

<style scoped>
  .denied-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 100px);
    padding: 2rem;
  }

  .denied-content {
    text-align: center;
    background: var(--surface-card, #ffffff);
    padding: 3rem 2rem;
    border-radius: 12px;
    border: 1px solid var(--surface-border, #e2e8f0);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    max-width: 450px;
    width: 100%;
  }

  .icon-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--red-50, #fef2f2);
    color: var(--red-500, #ef4444);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 1.5rem;
  }

    .icon-container i {
      font-size: 2.5rem;
    }

  .title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--surface-900, #0f172a);
    margin: 0 0 1rem 0;
  }

  .subtitle {
    font-size: 1rem;
    color: var(--surface-500, #64748b);
    line-height: 1.5;
    margin: 0 0 2rem 0;
  }

  .action-button {
    width: 100%;
  }
</style>
