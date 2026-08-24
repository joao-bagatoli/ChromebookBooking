<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import Avatar from 'primevue/avatar'
  import Popover from 'primevue/popover'
  import Button from 'primevue/button'
  import Tag from 'primevue/tag'
  import { getRoleSeverity, getRoleLabel } from '../utils/userUtils'

  const op = ref()
  const authStore = useAuthStore()

  const userAvatar = computed(() => {
    return authStore.user?.user_metadata?.avatar_url || authStore.user?.user_metadata?.picture || null
  })

  const userName = computed(() => {
    return authStore.user?.user_metadata?.full_name || authStore.user?.user_metadata?.name || null
  })

  const userEmail = computed(() => authStore.user?.email || null)

  const userRole = computed(() => authStore.profile?.role || null)

  function toggleMenu(event: Event) {
    op.value.toggle(event)
  }

  function handleLogout() {
    authStore.logout()
  }
</script>

<template>
  <div class="avatar-container">
    <div class="avatar-wrapper" @click="toggleMenu" aria-haspopup="true" aria-controls="user_popover">
      <Avatar v-if="userAvatar"
              :image="userAvatar"
              shape="circle"
              class="avatar-trigger"
              :pt="{ image: { referrerpolicy: 'no-referrer' } }"
              :title="userEmail">
      </Avatar>
      <Avatar v-else
              icon="pi pi-user"
              shape="circle"
              class="avatar-trigger"
              :title="userEmail">
      </Avatar>
    </div>
    <Popover ref="op" id="user_popover">
      <div class="user-profile-menu">
        <div class="user-info">
          <div class="user-identity">
            <span class="user-name">{{ userName }}</span>
            <Tag :value="getRoleLabel(userRole)" :severity="getRoleSeverity(userRole)" class="tag-font" rounded></Tag>
          </div>
          <span class="user-email">{{ userEmail }}</span>
        </div>
        <Button label="Sair"
                icon="pi pi-sign-out"
                severity="secondary"
                text
                size="small"
                class="logout-btn"
                @click="handleLogout">
        </Button>
      </div>
    </Popover>
  </div>
</template>

<style scoped>
  .avatar-container {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 1000;
  }

  .avatar-trigger {
    height: 2.25rem;
    width: 2.25rem;
    cursor: pointer;
  }

  .user-profile-menu {
    display: flex;
    flex-direction: column;
    min-width: 220px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
  }

  .user-identity {
      display: flex;
      align-items: center;
      gap: 0.5rem;
  }

  .user-name {
    font-size: var(--font-base);
    font-weight: 700;
    color: var(--p-text-color)
  }

  .user-email {
    font-size: var(--font-sm);
    color: var(--p-text-muted-color);
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
  }

  .logout-btn {
      justify-content: flex-start;
  }

</style>
