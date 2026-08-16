import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import ServiceFactory from '../services/ServiceFactory'
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

  async function createCabinet(name: string) {
    const cabinet = await cabinetService.createCabinet(name)

    cabinets.value.push(cabinet)

    return cabinet
  }

  return {
    cabinets,
    getAllCabinets,
    createCabinet
  }
})
