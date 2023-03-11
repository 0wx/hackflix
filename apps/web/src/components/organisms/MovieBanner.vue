<script>
import StarIcon from '../atoms/StarIcon.vue'
import InfoIcon from '../atoms/InfoIcon.vue'
import YoutubeHome from '../atoms/YoutubeHome.vue'
import GenreIcon from '../atoms/GenreIcon.vue'
import MovieBannerSkeleton from '../atoms/MovieBannerSkeleton.vue'

import { getYoutubeId } from '../../helpers/regex'
import FavoriteButton from '../molecules/FavoriteButton.vue'
import { mapActions } from 'pinia'
import { useMoviesStore } from '../../stores/movies'

export default {
  data() {
    return {
      movie: null,
    }
  },
  components: {
    MovieBannerSkeleton,
    YoutubeHome,
    StarIcon,
    InfoIcon,
    GenreIcon,
    FavoriteButton,
  },
  methods: {
    getYoutubeId,
    ...mapActions(useMoviesStore, ['getMovieRandom']),
  },
  async created() {
    try {
      const { data } = await this.getMovieRandom()
      this.movie = data
    } catch (error) {
      console.log(error)
      this.$notify({
        group: 'error',
        title: 'Error',
        text: 'Internal Server Error',
      })
    }
  },
}
</script>

<template>
  <MovieBannerSkeleton v-if="!movie" />
  <div v-if="movie">
    <YoutubeHome :id="getYoutubeId(movie.trailerUrl)" />
    <div
      class="absolute top-0 h-[95vh] bg-[rgb(0,0,0,0.4)] w-full flex flex-col py-12 lg:py-24 lg:pb-40 gap-8 px-12 justify-end"
    >
      <div class="flex gap-10">
        <div class="avatar">
          <div class="h-64 w-44 rounded-xl shadow-lg">
            <img :src="movie.imgUrl" />
          </div>
        </div>
        <div class="">
          <h1
            class="text-white text-6xl font-bold mb-2 flex items-center gap-3"
          >
            {{ movie.title }}
          </h1>
          <p class="text-lg max-w-xl">
            {{ movie.synopsis.slice(0, 250).trim() }}...
          </p>
          <div class="flex gap-2 mt-6">
            <FavoriteButton :id="movie.id" />
            <RouterLink :to="`/movies/${movie.id}`">
              <button class="btn btn-outline text-white flex gap-2">
                <InfoIcon />
                Movie Detail
              </button>
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="absolute right-0">
        <div
          class="bg-slate-700 py-5 pl-7 pr-20 font-bold bg-opacity-40 flex items-center rounded-l-xl"
        >
          <GenreIcon />
          <div class="capitalize">{{ movie.Genre.name }}</div>
          <div class="divider divider-horizontal"></div>
          <div class="text-lg flex items-center gap-2">
            <StarIcon color="yellow" />
            {{ movie.rating }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="h-[15vh] absolute -translate-y-[14vh] px-10 w-full flex items-center bg-gradient-to-t from-[#141414]"
    ></div>
  </div>
</template>
