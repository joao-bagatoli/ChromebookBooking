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
    component: Component,
    addLabel: string,
    dialogComponent: Component
  }

  const settingPanels = shallowRef<SettingPanel[]>([
    {
      key: 'users',
      title: 'Usuários',
      component: UserPanel,
      addLabel: 'Adicionar Usuário',
      dialogComponent: UserDialog
    },
    {
      key: 'sections',
      title: 'Turmas',
      component: SectionPanel,
      addLabel: 'Adicionar Turma',
      dialogComponent: SectionDialog
    },
    {
      key: 'cabinets',
      title: 'Gabinetes',
      component: CabinetPanel,
      addLabel: 'Adicionar Gabinete',
      dialogComponent: CabinetDialog
    }
  ])

  const activePanel = ref('users')

  const isDialogVisible = ref(false)
  const itemToEdit = ref<any>(null)

  const currentActiveSettings = computed(() => {
    return settingPanels.value.find(p => p.key === activePanel.value)
  })

  const addButtonLabel = computed(() => currentActiveSettings.value?.addLabel)
  const activeDialogComponent = computed(() => currentActiveSettings.value?.dialogComponent)

  const handleAdd = () => {
    itemToEdit.value = null
    isDialogVisible.value = true
  }

  const handleEdit = (item: any) => {
    itemToEdit.value = item
    isDialogVisible.value = true
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
          <component :is="panel.component" @edit="handleEdit" />
        </TabPanel>
      </TabPanels>
    </Tabs>

    <component v-if="activeDialogComponent"
               :is="activeDialogComponent"
               v-model:visible="isDialogVisible"
               :item="itemToEdit" />
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
