import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
export const useCabinetStore = defineStore('cabinet', () => {
    const serviceFactory = inject('serviceFactory');
    const cabinetService = serviceFactory.createCabinetService();
    const cabinets = ref([]);
    async function getAllCabinets() {
        try {
            cabinets.value = await cabinetService.getAllCabinets();
        }
        catch (error) {
            console.error('Error loading cabinets:', error);
        }
    }
    async function createCabinet(name) {
        const cabinet = await cabinetService.createCabinet(name);
        cabinets.value.push(cabinet);
        return cabinet;
    }
    async function updateCabinet(id, name, isActive) {
        await cabinetService.updateCabinet(id, name, isActive);
        const index = cabinets.value.findIndex((c) => c.id === id);
        if (index !== -1) {
            cabinets.value[index] = { id, name, isActive };
        }
    }
    async function deleteCabinet(id) {
        await cabinetService.deleteCabinet(id);
        cabinets.value = cabinets.value.filter((c) => c.id !== id);
    }
    return {
        cabinets,
        getAllCabinets,
        createCabinet,
        updateCabinet,
        deleteCabinet
    };
});
