<script>
import { mapActions, mapState } from 'pinia'
import { RouterLink } from 'vue-router'
import { useUserStore } from '../../stores/user'

export default {
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(useUserStore, ['email']),
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
  },
}
</script>

<template>
  <div v-if="email" class="flex gap-2 items-center pr-2">
    <RouterLink to="/favorited">
      <button class="btn btn-ghost">My Favorites</button>
    </RouterLink>
    <div class="dropdown dropdown-end">
      <div tabindex="0" class="avatar flex items-center cursor-pointer">
        <div class="w-10 h-10 bg-black bg-opacity-50 rounded-full p-2">
          <img src="/profile.png" />
        </div>
      </div>
      <div
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-100 bg-opacity-80 rounded-lg translate-y-2"
      >
        <div class="px-4 py-2 max-w-[160px]">
          <p class="text-[10px] truncate">{{ email }}</p>
        </div>
        <button @click="logout(true)" class="btn btn-ghost">logout</button>
      </div>
    </div>
  </div>
</template>
