<script>
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import MovieCard from '../molecules/MovieCard.vue'
import MovieCardSkeleton from '../atoms/MovieCardSkeleton.vue'
import { mapActions } from 'pinia'
import { useMoviesStore } from '../../stores/movies'

export default {
  props: ['title', 'params'],
  data() {
    return {
      itemToShow: window.innerWidth / 430,
      movies: [],
      loading: true,
    }
  },
  components: {
    MovieCard,
    Carousel,
    Slide,
    Navigation,
    MovieCardSkeleton,
    Pagination,
  },
  methods: mapActions(useMoviesStore, ['getMoviesCustom']),
  async created() {
    try {
      const { data } = await this.getMoviesCustom(this.params)
      this.movies = data.movies
    } catch (error) {
      this.$notify(
        {
          group: 'error',
          title: 'Error',
          message: error.response.data.message,
        },
        2000
      )
    } finally {
      this.loading = false
    }
  },
}
</script>

<template>
  <div v-if="!loading" class="-translate-y-20 px-12 mb-10">
    <h1 class="font-bold text-xl flex items-center gap-5">
      {{ title }}
      <span class="text-primary text-sm">See all {{ title }} »</span>
    </h1>

    <Carousel :items-to-show="itemToShow" :wrap-around="true">
      <Slide v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
  <div v-if="loading" class="-translate-y-20 px-12 mb-10">
    <h1
      class="font-bold text-xl flex items-center gap-5 h-6 w-72 bg-base-100 animate-pulse rounded-xl"
    ></h1>

    <Carousel :items-to-show="itemToShow" :wrap-around="true">
      <Slide v-for="i in 10" :key="i">
        <MovieCardSkeleton />
      </Slide>
    </Carousel>
  </div>
</template>

<style>
.carousel__slide {
  padding-top: 40px;
  padding-bottom: 40px;
}
.carousel__icon {
  color: white;
  background: rgb(0, 0, 0, 0.3);
  border-radius: 5px;
  height: 80px;
}
</style>
