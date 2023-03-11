<script>
import GenreCard from '../components/molecules/GenreCard.vue'
import GenreCardSkeleton from '../components/atoms/GenreCardSkeleton.vue'

import { mapActions, mapState } from 'pinia'
import { useGenresStore } from '../stores/genres'
export default {
  components: {
    GenreCard,
    GenreCardSkeleton,
  },
  computed: mapState(useGenresStore, [
    'selectedGenre',
    'loading',
    'letters',
    'selected',
  ]),

  methods: mapActions(useGenresStore, ['fetchGenres', 'select']),
  created() {
    this.fetchGenres()
  },
  watch: {
    selected() {
      this.fetchGenres()
    },
  },
}
</script>

<template>
  <div class="px-12 pt-16 flex items-center flex-col gap-10 mx-auto">
    <h1 class="text-2xl font-bold">Genre List</h1>
    <div class="flex gap-4 w-full flex-wrap">
      <button
        :class="`btn ${selected === letter && 'bg-[#E50914]'}`"
        v-for="letter in letters"
        :key="letter"
        @click="select(letter)"
      >
        {{ letter }}
      </button>
    </div>

    <div class="w-full">
      <h1 class="w-full text-5xl font-bold flex items-center gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
          />
        </svg>
        {{ selected }}
      </h1>
      <div class="divider"></div>
      <div v-if="!loading" class="flex flex-wrap gap-5">
        <GenreCard
          v-for="genre in selectedGenre"
          :key="genre.id"
          :genre="genre"
        />
      </div>
      <div v-if="loading" class="flex flex-wrap gap-5">
        <GenreCardSkeleton v-for="c in 10" :key="c" />
      </div>
    </div>
  </div>
</template>
