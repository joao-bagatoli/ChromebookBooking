<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputSwitch from 'primevue/inputswitch'
import { useCabinetStore } from '../../../stores/cabinet'
import type { Cabinet } from '../../../types/cabinet'

const visible = defineModel<boolean>('visible', {
  default: false
})

const props = defineProps<{
  cabinet?: Cabinet | null
}>()

const cabinetStore = useCabinetStore()
const cabinetName = ref('')
const isActive = ref(true)
const loading = ref(false)
const errorMessage = ref('')

const isEditing = () => {
  return props.cabinet !== null && props.cabinet !== undefined
}

watch(
  () => props.cabinet,
  (cabinet) => {
    if (cabinet) {
      cabinetName.value = cabinet.name
      isActive.value = Boolean(cabinet.isActive)
    } else {
      cabinetName.value = ''
      isActive.value = true
    }
    errorMessage.value = ''
  },
  {
    immediate: true,
    deep: true
  }
)

const resetForm = () => {
  cabinetName.value = ''
  isActive.value = true
  errorMessage.value = ''
}

const closeDialog = () => {
  visible.value = false
  resetForm()
}

const handleCancel = () => {
  if (loading.value) return
  closeDialog()
}

const handleSave = async () => {
  const name = cabinetName.value.trim()
  if (!name) {
    errorMessage.value = 'Informe o nome do gabinete.'
    return
  }
  try {
    loading.value = true
    errorMessage.value = ''
    if (props.cabinet) {
      await cabinetStore.updateCabinet(
        props.cabinet.id,
        name,
        isActive.value
      )
    } else {
      await cabinetStore.createCabinet(name)
    }
    closeDialog()
  } catch (error) {
    console.error('Erro ao salvar gabinete:', error)
    if (isEditing()) {
      errorMessage.value =
        'Não foi possível atualizar o gabinete.'
    } else {
      errorMessage.value =
        'Não foi possível criar o gabinete.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Dialog v-model:visible="visible"
          modal
          :header="
      isEditing()
        ? 'Editar Gabinete'
        : 'Adicionar Gabinete'
    "
          :style="{
      width: '100%',
      maxWidth: '28rem'
    }"
          :breakpoints="{
      '640px': '90vw'
    }"
          class="mx-3">
    <div class="flex flex-column gap-3 mb-4">
      <!-- Nome -->
      <div class="flex flex-column gap-2">
        <label for="cabinetName"
               class="font-medium text-sm text-700">
          Nome do Gabinete
        </label>
        <InputText id="cabinetName"
                   v-model="cabinetName"
                   class="w-full"
                   placeholder="Ex: Gabinete A-102"
                   autocomplete="off"
                   :disabled="loading"
                   @keyup.enter="handleSave" />
      </div>
      <!-- Ativo/Inativo -->
      <div v-if="isEditing()"
           class="flex align-items-center justify-content-between">
        <label for="cabinetActive"
               class="font-medium text-sm text-700">
          Gabinete ativo
        </label>
        <InputSwitch id="cabinetActive"
                     v-model="isActive"
                     :disabled="loading" />
      </div>
      <!-- Erro -->
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
                @click="handleCancel" />
        <Button type="button"
                label="Salvar"
                :loading="loading"
                :disabled="!cabinetName.trim()"
                @click="handleSave" />
      </div>
    </template>
  </Dialog>
</template>
