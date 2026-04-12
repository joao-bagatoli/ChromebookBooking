import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import AxiosHttpClient from './http/AxiosHttpClient'
import ServiceFactory from './services/ServiceFactory'
import { createPinia } from 'pinia'
import { router } from './router'

const httpClient = new AxiosHttpClient()
const baseUrl = import.meta.env.VITE_BASE_URL
const serviceFactory = new ServiceFactory(httpClient, baseUrl)
const pinia = createPinia()

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(pinia)
app.use(router)

app.provide('serviceFactory', serviceFactory)

app.mount('#app')
