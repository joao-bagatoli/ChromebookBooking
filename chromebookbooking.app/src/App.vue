<script setup lang="ts">
  import { inject, onMounted, ref } from 'vue';
  import BaseButton from './components/ui/BaseButton.vue'
  import BaseInput from './components/ui/BaseInput.vue'
  import InputText from 'primevue/inputtext'
  import type ServiceFactory from './services/ServiceFactory';

  const serviceFactory = inject('serviceFactory') as ServiceFactory
  const cabinetService = serviceFactory.createCabinetService()
  const cabinet = ref('')

  onMounted(() => {
    const data = cabinetService.getAllCabinets()
    console.log(data)
  })
</script>

<template>
  <BaseInput type="text" v-model="cabinet" />
  <BaseButton label="Submit" />
</template>

<style scoped>

</style>
