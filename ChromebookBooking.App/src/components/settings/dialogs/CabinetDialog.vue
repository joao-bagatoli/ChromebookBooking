<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useCabinetStore } from '../../../stores/cabinet'

const visible = defineModel<boolean>('visible', { default: false })

const cabinetStore = useCabinetStore()

const cabinetName = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleSave = async () => {
  const name = cabinetName.value.trim()

  if (!name) {
    errorMessage.value = 'Informe o nome do gabinete.'
    return
  }

  try {
    loading.value = true
    errorMessage.value = ''

    await cabinetStore.createCabinet(name)

    cabinetName.value = ''
    visible.value = false
  } catch (error) {
    console.error('Erro ao criar gabinete:', error)

    errorMessage.value = 'Não foi possível criar o gabinete.'
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  if (loading.value) return

  visible.value = false
  cabinetName.value = ''
  errorMessage.value = ''
}
</script>

<template>
  <Dialog v-model:visible="visible"
          modal
          header="Adicionar Gabinete"
          :style="{ width: '100%', maxWidth: '28rem' }"
          :breakpoints="{ '640px': '90vw' }"
          class="mx-3">
    <div class="flex flex-column gap-2 mb-4">
      <label for="cabinetCode"
             class="font-medium text-sm text-700">
        Nome do Gabinete
      </label>

      <InputText id="cabinetCode"
                 v-model="cabinetName"
                 class="w-full"
                 placeholder="Ex: Gabinete A-102"
                 autocomplete="off"
                 :disabled="loading"
                 @keyup.enter="handleSave" />

      <small v-if="errorMessage"
             class="text-red-500">
        {{ errorMessage }}
      </small>
    </div>

    <template #footer>
      <div class="flex justify-content-end gap-2 pt-2">
        <Button type="button"
                label="Cancelar"
                severity="secondary"
                text
                :disabled="loading"
                @click="handleClose" />

        <Button type="button"
                label="Salvar"
                :loading="loading"
                :disabled="!cabinetName.trim()"
                @click="handleSave" />
      </div>
    </template>
  </Dialog>
</template>
