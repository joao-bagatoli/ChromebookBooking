<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const visible = defineModel<boolean>('visible', { default: false })

const handleSave = () => {
  visible.value = false
}
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Adicionar Usuário" :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5">Preencha os dados do novo usuário.</span>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-6rem">Nome</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-6rem">Email</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false" />
      <Button type="button" label="Salvar" @click="handleSave" />
    </div>
  </Dialog>
</template>
