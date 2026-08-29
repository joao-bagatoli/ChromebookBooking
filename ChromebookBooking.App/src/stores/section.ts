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
      throw error
    }
  }

  async function addSection(name: string) {
    try {
      const newSection = await sectionService.createSection(name)
      sections.value.push(newSection)
    } catch (error) {
      console.error('Error adding user:', error)
      throw error
    }
  }

  async function updateSection(id: number, payload: { name: string, isActive: boolean }) {
    try {
      await sectionService.updateSection(id, payload)
      const section = sections.value.find(s => s.id === id)
      if (section) {
        section.name = payload.name
        section.isActive = payload.isActive
      }
    } catch (error) {
      console.error('Error updating section:', error)
      throw error
    }
  }

  return {
    sections,
    loadSections,
    addSection,
    updateSection
  }
})
