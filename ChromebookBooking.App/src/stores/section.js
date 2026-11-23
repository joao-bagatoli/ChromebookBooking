import { defineStore } from 'pinia';
import { ref, inject } from 'vue';
export const useSectionStore = defineStore('section', () => {
    const serviceFactory = inject('serviceFactory');
    const sectionService = serviceFactory.createSectionService();
    const sections = ref([]);
    async function loadSections() {
        try {
            sections.value = await sectionService.getAllSections();
        }
        catch (error) {
            console.error('Error loading sections:', error);
            throw error;
        }
    }
    async function addSection(name, shift) {
        try {
            const newSection = await sectionService.createSection(name, shift);
            sections.value.push(newSection);
        }
        catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }
    async function updateSection(id, payload) {
        try {
            await sectionService.updateSection(id, payload);
            const section = sections.value.find(s => s.id === id);
            if (section) {
                section.name = payload.name;
                section.shift = payload.shift;
                section.isActive = payload.isActive;
            }
        }
        catch (error) {
            console.error('Error updating section:', error);
            throw error;
        }
    }
    async function deleteSection(id) {
        try {
            await sectionService.deleteSection(id);
            sections.value = sections.value.filter(s => s.id !== id);
        }
        catch (error) {
            console.error('Error deleting section:', error);
            throw error;
        }
    }
    return {
        sections,
        loadSections,
        addSection,
        updateSection,
        deleteSection
    };
});
