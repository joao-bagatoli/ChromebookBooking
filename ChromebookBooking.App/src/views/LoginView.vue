<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useAuthStore } from "../stores/auth"

const authStore = useAuthStore()
</script>

<template>
  <div class="login-container">
    <div class="left-panel">
      <div class="overlay">
        <img src="../assets/images/logo-joinville.svg"
             alt="Prefeitura de Joinville"
             class="city-logo" />
      </div>
    </div>

    <div class="right-panel">
      <div class="content-wrapper">
        <h1 class="page-title">Reservas de ChromeBooks</h1>
        <Card>
          <template #content>
            <div class="card-content">
              <h2 class="welcome-title">Bem-Vindo</h2>
              <p class="instruction-text">Faça login com sua conta Google institucional para acessar o sistema</p>

              <Button class="google-btn" severity="secondary" outlined @click="authStore.loginWithGoogle">
                <img src="../assets/images/google-logo.svg" alt="Logo do Google" class="google-icon" />
                <span class="btn-text">Entrar com Google</span>
              </Button>

              <p class="restriction-text">Acesso restrito a contas @edu.joinville.sc.gov.br</p>
            </div>
          </template>
        </Card>
        <footer class="footer-text">
          © 2026 Engenharia de Software · Católica SC
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .login-container {
    display: flex;
    height: 100vh;
    background-color: var(--background, #ffffff);
    font-family: sans-serif;
  }

 
  .left-panel {
    flex: 1.2; 
    background-image: url('../assets/images/background-sala.png'); 
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(11, 84, 146, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .city-logo {
    max-width: 60%;
    height: auto;
    object-fit: contain;
  }

  .right-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }

  .content-wrapper {
    width: 100%;
    max-width: 440px;
    padding: 2rem;
  }

  .page-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 2.5rem;
    text-align: left;
  }

  :deep(.p-card) {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
  }

  .card-content {
    text-align: center;
    padding: 1rem 0.5rem;
  }

  .welcome-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.75rem;
  }

  .instruction-text {
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 2rem;
    line-height: 1.4;
  }

  .google-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-color: #cbd5e1 !important;
  }

  .google-icon {
    width: 18px;
    height: 18px;
  }

  .btn-text {
    font-weight: 500;
    color: #334155;
  }

  .restriction-text {
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 1.5rem;
  }

  .footer-text {
    font-size: 0.75rem;
    color: #94a3b8;
    margin-top: 3rem;
    text-align: center;
  }

  @media (max-width: 900px) {
    .login-container {
      flex-direction: column;
    }

    .left-panel {
      display: none;
    }

    .content-wrapper {
      max-width: 100%;
    }
  }
</style>
