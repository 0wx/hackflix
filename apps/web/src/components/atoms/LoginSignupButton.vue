<script>
import { mapState } from 'pinia'
import { RouterLink } from 'vue-router'
import { useUserStore } from '../../stores/user'

export default {
  data() {
    return {
      to: undefined,
    }
  },
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(useUserStore, ['email']),
  },
  created() {
    this.$watch(
      () => this.$route.path,
      (to) => {
        if (!this.$route.query.to)
          this.to =
            to === '/login' || to === '/signup' || to === '/' ? undefined : to
      }
    )
  },
}
</script>

<template>
  <div v-if="!email" class="flex pr-2">
    <RouterLink :to="{ name: 'login', query: { to } }">
      <button class="btn btn-ghost">Login</button>
    </RouterLink>
    <RouterLink :to="{ name: 'signup', query: { to } }">
      <button class="btn btn-ghost">Sign Up</button>
    </RouterLink>
  </div>
</template>
