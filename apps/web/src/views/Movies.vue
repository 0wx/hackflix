<script>
import { mapActions } from 'pinia'
import MoviesFilter from '../components/organisms/MoviesFilter.vue'
import MoviesResult from '../components/organisms/MoviesResult.vue'
import { useMoviesStore } from '../stores/movies'

export default {
  components: {
    MoviesResult,
    MoviesFilter,
  },
  methods: mapActions(useMoviesStore, ['resetState']),
  unmounted() {
    this.resetState()
  },
}
</script>

<template>
  <div class="px-12 pt-16">
    <div class="flex gap-10 mt-5">
      <MoviesFilter />
      <div class="divider divider-horizontal pl-[26.5rem]"></div>
      <MoviesResult />
    </div>
  </div>
</template>
