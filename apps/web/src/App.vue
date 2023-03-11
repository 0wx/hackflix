<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { RouterView } from 'vue-router'
import { useUserStore } from './stores/user'

import MainLayout from './components/layouts/Main.vue'
import Notification from './components/molecules/Notification.vue'
import { useFavoritesStore } from './stores/favorites'

export default {
  components: {
    RouterView,
    MainLayout,
    Notification,
  },
  computed: {
    ...mapWritableState(useFavoritesStore, ['favorites']),
    ...mapState(useUserStore, ['email']),
  },
  methods: {
    ...mapActions(useUserStore, ['checkAccessToken']),
    ...mapActions(useFavoritesStore, ['fetchFavorites']),
  },
  created() {
    this.checkAccessToken()
    this.fetchFavorites(true)
  },

  watch: {
    email(newEmail) {
      if (!newEmail) {
        this.favorites = []
        return
      }
      this.fetchFavorites()
    },
  },
}
</script>

<template>
  <MainLayout>
    <Notification />
    <RouterView />
  </MainLayout>
</template>
