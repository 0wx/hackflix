<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink,
  },
}
</script>

<template>
  <RouterLink to="/">
    <div class="avatar pt-1">
      <div class="w-28 h-9">
        <img src="/logo.png" />
      </div>
    </div>
  </RouterLink>
</template>
