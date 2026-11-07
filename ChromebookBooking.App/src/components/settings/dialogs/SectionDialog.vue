<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useSectionStore } from '@/stores/section'
  import type { Section } from '@/types/section'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'
  import InputText from 'primevue/inputtext'
  import ToggleSwitch from 'primevue/toggleswitch'
  import Select from 'primevue/select'
  import { useToast } from 'primevue/usetoast'

  const visible = defineModel<boolean>('visible', { default: false })
  const props = defineProps<{
    item?: Section | null
  }>()

  const sectionStore = useSectionStore()
  const toast = useToast()

  const isLoading = ref(false)

  const form = ref({ name: '', isActive: false, shift: '' })

  const shiftOptions = ref([
    { label: 'Matutino', value: 'Morning' },
    { label: 'Vespertino', value: 'Afternoon' }
  ])

  watch(() => props.item, (newVal) => {
    if (newVal) {
      form.value.name = newVal.name
      form.value.isActive = newVal.isActive ?? false
      form.value.shift = newVal.shift || ''
    } else {
      clearForm()
    }
  }, { immediate: true })

  const isEditing = computed(() => props.item !== null && props.item !== undefined)
  const dialogTitle = computed(() => isEditing.value ? 'Editar Turma' : 'Adicionar Turma')

  function clearForm() {
    form.value.name = ''
    form.value.isActive = false
    form.value.shift = ''
  }

  function closeDialog() {
    visible.value = false
  }

  const handleSave = async () => {
    if (!form.value.name || !form.value.shift) {
      toast.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Informe o nome e o turno da turma.',
        life: 3000
      })
      return
    }

    try {
      isLoading.value = true
      if (isEditing.value) {
        await sectionStore.updateSection(props.item!.id, {
          name: form.value.name,
          isActive: form.value.isActive,
          shift: form.value.shift
        })
        toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Turma atualizada com sucesso!',
          life: 3000
        })
      } else {
        await sectionStore.addSection(form.value.name, form.value.shift)
        toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Turma cadastrada com sucesso!',
          life: 3000
        })
      }
      clearForm()
      closeDialog()
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível salvar a turma.',
        life: 3000
      })
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <Dialog v-model:visible="visible" modal :header="dialogTitle" :style="{ width: '30rem' }">
    <div class="form-container">

      <div class="form-group">
        <label for="sectionName">Nome</label>
        <InputText id="sectionName"
                   v-model="form.name"
                   autocomplete="off"
                   :disabled="isLoading"
                   @keyup.enter="handleSave" />
      </div>

      <div class="form-group">
        <label for="sectionShift">Turno</label>
        <Select id="sectionShift"
                v-model="form.shift"
                :options="shiftOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecione o turno"
                :disabled="isLoading" />
      </div>

      <div v-if="isEditing" class="form-group inline-group">
        <label for="active">Ativo</label>
        <ToggleSwitch id="active" v-model="form.isActive" :disabled="isLoading" />
      </div>

    </div>

    <template #footer>
      <div class="dialog-footer">
        <Button label="Cancelar"
                severity="secondary"
                outlined
                :disabled="isLoading"
                @click="closeDialog" />
        <Button label="Salvar"
                :loading="isLoading"
                @click="handleSave" />
      </div>
    </template>
  </Dialog>
</template>
