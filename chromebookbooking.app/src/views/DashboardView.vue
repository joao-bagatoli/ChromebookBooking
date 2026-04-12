<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import BaseButton from '../components/ui/BaseButton.vue'
  import BaseInput from '../components/ui/BaseInput.vue'
  import InputText from 'primevue/inputtext'
  import { useCabinetStore } from '../stores/useCabinetStore';

  const cabinet = ref('')
  const store = useCabinetStore()

  onMounted(() => {
    store.getAllCabinets()
  })
</script>

<template>
  <BaseInput type="text" v-model="cabinet" />
  <BaseButton label="Submit" />
  {{ store.cabinets }}
</template>

<style scoped>
</style>
