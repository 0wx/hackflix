<script>
import Slider from '../atoms/Slider.vue'
import { useMoviesStore } from '../../stores/movies'
import { mapWritableState } from 'pinia'
import MovieGenreFilter from '../molecules/MovieGenreFilter.vue'
import MoviesSortBy from '../molecules/MoviesSortBy.vue'

export default {
  components: {
    Slider,
    MovieGenreFilter,
    MoviesSortBy,
  },
  computed: {
    ...mapWritableState(useMoviesStore, ['search', 'perPage']),
  },
}
</script>

<template>
  <div id="sidebar" class="min-w-[24rem] flex flex-col gap-5 fixed">
    <div class="flex gap-4">
      <input
        type="search"
        placeholder="Search by title"
        class="input input-bordered w-full"
        v-model="search"
      />
    </div>

    <MovieGenreFilter />

    <div class="flex flex-col gap-3">
      <span class="font-bold">Rating</span>
      <Slider />
    </div>

    <MoviesSortBy />

    <div class="flex flex-col mt-2 gap-2">
      <span class="font-bold">Per Page</span>
      <div class="form-control">
        <input type="number" class="input input-bordered" v-model="perPage" />
      </div>
    </div>
  </div>
</template>
