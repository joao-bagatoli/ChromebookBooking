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

  async function updateCabinet(id: number, name: string, isActive: boolean) {
    await cabinetService.updateCabinet(id, name, isActive)

    const index = cabinets.value.findIndex((c) => c.id === id)
    if (index !== -1) {
      cabinets.value[index] = { id, name, isActive }
    }
  }

  return {
    cabinets,
    getAllCabinets,
    createCabinet,
    updateCabinet
  }
})
