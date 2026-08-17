import './assets/styles/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { preset } from './theme/preset'
import AxiosHttpClient from './http/AxiosHttpClient'
import ServiceFactory from './services/ServiceFactory'
import { createPinia } from 'pinia'
import { router } from './router'
import { useAuthStore } from './stores/auth'

const pinia = createPinia()
const app = createApp(App)

app.use(PrimeVue, { theme: { preset } })
app.use(ToastService)
app.use(pinia)

const authStore = useAuthStore()
await authStore.init()

const httpClient = new AxiosHttpClient(() => authStore.getToken())
const baseUrl = import.meta.env.VITE_BASE_URL
const serviceFactory = new ServiceFactory(httpClient, baseUrl)

app.provide('serviceFactory', serviceFactory)

const userService = serviceFactory.createUserService()
await authStore.getLoggedUser(userService)

app.use(router)
await router.isReady()

app.mount('#app')
