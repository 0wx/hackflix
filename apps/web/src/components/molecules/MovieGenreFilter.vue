<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useGenresStore } from '../../stores/genres'
import { useMoviesStore } from '../../stores/movies'

export default {
  computed: {
    ...mapState(useGenresStore, ['genres']),
    ...mapWritableState(useMoviesStore, ['genreId']),
  },
  methods: mapActions(useGenresStore, ['fetchAllGenres']),
  created() {
    this.fetchAllGenres()
  },
}
</script>

<template>
  <div>
    <span class="font-bold">Genres</span>
    <select v-model="genreId" class="select select-bordered w-full mt-2">
      <option :value="null">All</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>
