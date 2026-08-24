<script setup lang="ts">
import { ref } from 'vue'
import { useSectionStore } from '@/stores/section'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const sectionStore = useSectionStore()

const visible = defineModel<boolean>('visible', { default: false })

const form = ref({
  name: ''
})

function clearForm() {
  form.value.name = ''
}

const handleSave = async () => {
  try {
    await sectionStore.addSection(form.value.name)
    clearForm()
    visible.value = false
  } catch {

  }
}
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Adicionar Turma" :style="{ width: '30rem' }">
    <div class="form-container">
      <div class="form-group">
        <label for="sectionName">Nome</label>
        <InputText id="sectionName" v-model="form.name" autocomplete="off" />
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <Button label="Cancelar" severity="secondary" outlined @click="visible = false" />
        <Button label="Salvar" @click="handleSave" />
      </div>
    </template>
  </Dialog>
</template>
