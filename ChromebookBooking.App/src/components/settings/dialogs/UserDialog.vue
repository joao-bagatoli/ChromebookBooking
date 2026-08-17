<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import type { UserRole } from '@/types/user'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import ToggleSwitch from 'primevue/toggleswitch'

const userStore = useUserStore()

const visible = defineModel<boolean>('visible', { default: false })

const form = ref({
  email: '',
  role: 'Teacher',
})

const roleOptions = ref([
  { label: 'Professor', value: 'Teacher' },
  { label: 'Admin', value: 'Admin' }
])

function clearForm() {
  form.value.email = ''
  form.value.role = 'Teacher'
}

const handleSave = () => {
  try {
    userStore.addUser(form.value.email, form.value.role as UserRole)
    clearForm()
    visible.value = false
  } catch {

  }
}
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Adicionar Usuário" :style="{ width: '30rem' }">
    <div class="form-container">
      <!--<div class="form-group">
        <label for="username">Nome</label>
        <InputText id="username" v-model="form.name" autocomplete="off" />
      </div>-->
      <div class="form-group">
        <label for="email">Email</label>
        <InputText id="email" v-model="form.email" autocomplete="off" />
        <small class="input-hint">Apenas e-mails com domínio @edu.joinville.sc.gov.br são permitidos.</small>
      </div>
      <div class="form-group">
        <label>Perfil</label>
        <SelectButton v-model="form.role" :options="roleOptions" optionLabel="label" optionValue="value" />
      </div>
      <!--<div class="form-group inline-group">
        <label for="active">Ativo</label>
        <ToggleSwitch id="active" v-model="form.isActive" />
      </div>-->
    </div>
    <template #footer>
      <div class="dialog-footer">
        <Button label="Cancelar" severity="secondary" outlined @click="visible = false" />
        <Button label="Salvar" @click="handleSave" />
      </div>
    </template>
  </Dialog>
</template>
