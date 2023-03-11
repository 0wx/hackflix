<script>
import MovieCard from '../molecules/MovieCard.vue'
import { useMoviesStore } from '../../stores/movies'
import { mapActions, mapWritableState } from 'pinia'
import MovieCardSkeleton from '../atoms/MovieCardSkeleton.vue'
import MoviesPagination from '../molecules/MoviesPagination.vue'

export default {
  data() {
    return {
      timeout: setTimeout(() => {}),
    }
  },
  components: {
    MovieCard,
    MovieCardSkeleton,
    MoviesPagination,
  },
  computed: mapWritableState(useMoviesStore, [
    'search',
    'movies',
    'loading',
    'perPage',
    'genreId',
    'rating',
    'sortby',
  ]),
  methods: {
    ...mapActions(useMoviesStore, ['getMovies']),
    fetchResult() {
      this.loading = true
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        try {
          await this.getMovies()
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
      }, 1000)
    },
  },

  watch: {
    search() {
      this.fetchResult()
    },
    perPage() {
      this.fetchResult()
    },
    genreId() {
      this.fetchResult()
    },
    rating() {
      this.fetchResult()
    },
    sortby() {
      this.fetchResult()
    },
  },

  async created() {
    try {
      this.genreId = this.$route.query.genre || null
      this.loading = true
      await this.getMovies()
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  },
}
</script>

<template>
  <div id="content" class="w-full">
    <div v-if="!loading" class="flex flex-wrap gap-5">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
    <div v-if="loading" class="flex flex-wrap gap-5">
      <MovieCardSkeleton v-for="i in perPage" :key="i" />
    </div>
    <div class="btn-group w-full justify-center py-10">
      <MoviesPagination />
    </div>
  </div>
</template>
