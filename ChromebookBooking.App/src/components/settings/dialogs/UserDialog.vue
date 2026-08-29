<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import type { User, UserRole } from '@/types/user'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import ToggleSwitch from 'primevue/toggleswitch'
import { useToast } from 'primevue/usetoast'

const visible = defineModel<boolean>('visible', { default: false })

const props = defineProps<{
  item?: User | null
}>()

const userStore = useUserStore()
const toast = useToast() 

const isLoading = ref(false)
const form = ref({
  email: '',
  role: 'Teacher',
  isActive: false
})

const roleOptions = ref([
  { label: 'Professor', value: 'Teacher' },
  { label: 'Admin', value: 'Admin' }
])

function clearForm() {
  form.value.email = ''
  form.value.role = 'Teacher'
  form.value.isActive = false
}

watch(() => props.item, (newVal) => {
  if (newVal) {
    form.value.email = newVal.email
    form.value.role = newVal.role
    form.value.isActive = newVal.isActive ?? false
  } else {
    clearForm()
  }
}, { immediate: true })

const isEditing = computed(() => props.item !== null && props.item !== undefined)

const dialogTitle = computed(() => isEditing.value ? 'Editar Usuário' : 'Adicionar Usuário')

function closeDialog() {
  visible.value = false
}

const handleSave = async () => {
  if (!form.value.email && !isEditing) {
    toast.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Informe o email do usuário.',
      life: 3000
    })
    return
  }

  if (!form.value.role) {
    toast.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Informe o perfil do usuário.',
      life: 3000
    })
    return
  }

  try {
    isLoading.value = true
    if (isEditing.value) {
      await userStore.updateUser(props.item!.id, {
        role: form.value.role as UserRole,
        // sections: [], // até vincular user a section
        isActive: form.value.isActive
      })
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário atualizado com sucesso!',
        life: 3000
      })
    } else {
      await userStore.addUser(form.value.email, form.value.role as UserRole)
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário cadastrado com sucesso!',
        life: 3000
      })
    }
    clearForm()
    closeDialog()
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível salvar o usuário.',
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
        <label for="email">Email</label>
        <InputText id="email" v-model="form.email" autocomplete="off" :disabled="isLoading || isEditing" />
        <small class="input-hint">Apenas e-mails com domínio @edu.joinville.sc.gov.br são permitidos.</small>
      </div>
      <div class="form-group">
        <label>Perfil</label>
        <SelectButton v-model="form.role"
                      :options="roleOptions"
                      optionLabel="label"
                      optionValue="value"
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
        <Button label="Salvar" @click="handleSave" :loading="isLoading" />
      </div>
    </template>
  </Dialog>
</template>
