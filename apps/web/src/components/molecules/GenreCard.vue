<script>
import GenreIcon from '../atoms/GenreIcon.vue'
import { RouterLink } from 'vue-router'

export default {
  props: ['genre'],
  components: {
    GenreIcon,
    RouterLink,
  },
}
</script>

<template>
  <RouterLink :to="`/movies?genre=${genre.id}`">
    <div class="flex items-center gap-2 bg-slate-500 rounded-lg py-2 px-5">
      <GenreIcon />
      {{ genre.name }}
    </div>
  </RouterLink>
</template>
