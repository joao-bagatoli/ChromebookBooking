<script setup lang="ts">
  import Tabs from 'primevue/tabs'
  import TabList from 'primevue/tablist'
  import Tab from 'primevue/tab'
  import TabPanels from 'primevue/tabpanels'
  import TabPanel from 'primevue/tabpanel'
  import UserPanel from '@/components/settings/UserPanel.vue'
  import SectionPanel from '@/components/settings/SectionPanel.vue'
  import CabinetPanel from '@/components/settings/CabinetPanel.vue'
  import { ref, shallowRef, type Component } from 'vue'

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
</script>

<template>
  <div class="settings-container">
    <div class="settings-header">
      <h1 class="view-title">Configurações</h1>
      <p class="view-subtitle">Gerencie usuários, turmas e gabinetes</p>
    </div>
    <Tabs :value="activePanel" class="tabs-container">
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
  </div>
</template>

<style scoped>
  .tabs-container {
      margin-top: 1.25rem;
  }

    .tabs-container .p-tablist,
    .tabs-container .p-tabpanels {
        background: transparent;
    }
</style>
