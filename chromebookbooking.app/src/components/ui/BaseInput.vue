<script setup lang="ts">
  import InputText from 'primevue/inputtext'
  import InputNumber from 'primevue/inputnumber'
  import { computed } from 'vue'

  type InputType = 'text' | 'number'

  const props = defineProps<{
    type: InputType
  }>()

  const component = computed(() => {
    return props.type === 'text' ? InputText : InputNumber
  })
</script>

<template>
  <component :is="component" v-bind="$attrs" />
</template>

<style scoped>

</style>
