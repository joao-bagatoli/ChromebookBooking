import { defineStore } from 'pinia'
import { ref, inject } from 'vue'
import ServiceFactory from '../services/ServiceFactory'
import type { Section } from '../types/section'

export const useSectionStore = defineStore('section', () => {
  const serviceFactory = inject('serviceFactory') as ServiceFactory
  const sectionService = serviceFactory.createSectionService()
  const sections = ref<Section[]>([])

  async function loadSections() {
    try {
      sections.value = await sectionService.getAllSections()
    } catch (error) {
      console.error('Error loading sections:', error)
    }
  }

  return {
    sections,
    loadSections
  }
})
