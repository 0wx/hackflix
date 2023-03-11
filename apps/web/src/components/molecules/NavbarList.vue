<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink,
  },
}
</script>

<template>
  <div class="flex gap-5">
    <RouterLink to="/movies">Movies</RouterLink>
    <RouterLink to="/genres">Genres</RouterLink>
  </div>
</template>
