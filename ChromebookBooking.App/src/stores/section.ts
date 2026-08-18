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

  async function addSection(name: string) {
    try {
      const newSection = await sectionService.createSection(name)
      sections.value.push(newSection)
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  return {
    sections,
    loadSections,
    addSection
  }
})
