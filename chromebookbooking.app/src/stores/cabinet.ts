import { defineStore } from 'pinia'
import { inject } from 'vue'
import ServiceFactory from '../services/ServiceFactory'
import { ref } from 'vue'
import type { Cabinet } from '../types/cabinet'

export const useCabinetStore = defineStore('cabinet', () => {
  const serviceFactory = inject('serviceFactory') as ServiceFactory
  const cabinetService = serviceFactory.createCabinetService()
  const cabinets = ref<Cabinet[]>([])

  async function getAllCabinets() {
    try {
      cabinets.value = await cabinetService.getAllCabinets()
    } catch (error) {
      console.error('Error loading cabinets:', error)
    }
  }

  return {
    cabinets,
    getAllCabinets
  }
})
