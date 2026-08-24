<script setup lang="ts">
  import Tabs from 'primevue/tabs'
  import TabList from 'primevue/tablist'
  import Tab from 'primevue/tab'
  import TabPanels from 'primevue/tabpanels'
  import TabPanel from 'primevue/tabpanel'
  import Button from 'primevue/button'

  import UserPanel from '@/components/settings/UserPanel.vue'
  import SectionPanel from '@/components/settings/SectionPanel.vue'
  import CabinetPanel from '@/components/settings/CabinetPanel.vue'

  import UserDialog from '@/components/settings/dialogs/UserDialog.vue'
  import SectionDialog from '@/components/settings/dialogs/SectionDialog.vue'
  import CabinetDialog from '@/components/settings/dialogs/CabinetDialog.vue'

  import { ref, shallowRef, computed, type Component } from 'vue'

  interface SettingPanel {
    key: string,
    title: string,
    component: Component
  }

  const settingPanels = shallowRef<SettingPanel[]>([
    { key: 'users', title: 'Usuários', component: UserPanel },
    { key: 'sections', title: 'Turmas', component: SectionPanel },
    { key: 'cabinets', title: 'Gabinetes', component: CabinetPanel }
  ])

  const activePanel = ref('users')

  const showUserModal = ref(false)
  const showSectionModal = ref(false)
  const showCabinetModal = ref(false)

  const addButtonLabel = computed(() => {
    switch (activePanel.value) {
      case 'users': return 'Adicionar Usuário'
      case 'sections': return 'Adicionar Turma'
      case 'cabinets': return 'Adicionar Gabinete'
      default: return 'Adicionar'
    }
  })

  const handleAdd = () => {
    if (activePanel.value === 'users') showUserModal.value = true
    if (activePanel.value === 'sections') showSectionModal.value = true
    if (activePanel.value === 'cabinets') showCabinetModal.value = true
  }
</script>

<template>
  <div class="settings-container">
    <div class="settings-header">
      <div>
        <h1 class="view-title">Configurações</h1>
        <p class="view-subtitle">Gerencie usuários, turmas e gabinetes</p>
      </div>

      <Button :label="addButtonLabel" icon="pi pi-plus" @click="handleAdd" />
    </div>

    <Tabs :value="activePanel" @update:value="(val) => activePanel = String(val)" class="tabs-container">
      <TabList>
        <Tab v-for="panel in settingPanels" :key="panel.key" :value="panel.key">
          {{ panel.title }}
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel v-for="panel in settingPanels" :key="panel.key" :value="panel.key">
          <component :is="panel.component" />
        </TabPanel>
      </TabPanels>
    </Tabs>

    <UserDialog v-model:visible="showUserModal" />
    <SectionDialog v-model:visible="showSectionModal" />
    <CabinetDialog v-model:visible="showCabinetModal" />
  </div>
</template>

<style scoped>
  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 50px;
  }

  .tabs-container {
    margin-top: 1.25rem;
  }

    .tabs-container .p-tablist,
    .tabs-container .p-tabpanels {
      background: transparent;
    }
</style>
