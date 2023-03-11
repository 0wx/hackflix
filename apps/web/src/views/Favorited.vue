<script>
import { mapState } from 'pinia'
import MovieCard from '../components/molecules/MovieCard.vue'
import { useFavoritesStore } from '../stores/favorites'

export default {
  components: {
    MovieCard,
  },
  computed: {
    ...mapState(useFavoritesStore, ['favorites']),
  },
}
</script>

<template>
  <div class="px-12 pt-24 flex flex-col">
    <div class="text-4xl font-bold">Favorited</div>
    <div class="divider"></div>
    <div class="flex flex-wrap gap-5">
      <MovieCard v-for="movie in favorites" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>
