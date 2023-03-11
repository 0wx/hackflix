<script>
import { mapActions } from 'pinia'
import GenreIcon from '../components/atoms/GenreIcon.vue'
import StarIcon from '../components/atoms/StarIcon.vue'
import FavoriteButton from '../components/molecules/FavoriteButton.vue'
import { getYoutubeId } from '../helpers/regex'
import { useMoviesStore } from '../stores/movies'

export default {
  data() {
    return {
      url: '',
      movie: null,
      loading: false,
      watchTrailer: false,
    }
  },
  components: {
    StarIcon,
    GenreIcon,
    FavoriteButton,
  },
  computed: {
    embedId() {
      return getYoutubeId(this.movie.trailerUrl)
    },
  },
  methods: {
    ...mapActions(useMoviesStore, ['getMovieDetail']),
    getYoutubeId,
    async fetchData() {
      try {
        this.loading = true
        this.$route.params.id
        const { data } = await this.getMovieDetail(this.$route.params.id)
        this.movie = data
      } catch (error) {
        this.$notify({
          group: 'error',
          title: 'Error',
          text: error.response.data.message,
        })
        // TODO: handling 404
      } finally {
        this.loading = false
      }
    },

    toggleTrailer() {
      this.watchTrailer = !this.watchTrailer
    },
  },
  created() {
    this.url = window.location.href
    this.fetchData()
  },
}
</script>

<template>
  <div
    @click="toggleTrailer"
    :class="`${
      !watchTrailer && 'translate-y-full'
    } fixed z-50 bg-black bg-opacity-60 w-screen h-screen flex justify-center items-center transition-all`"
  >
    <iframe
      v-if="watchTrailer"
      width="990"
      height="600"
      :src="`https://www.youtube.com/embed/${embedId}?playlist=${embedId}&autoplay=1`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
  <div v-if="!loading && movie">
    <div
      class="fixed right-0 h-[100vh] w-[50vw]"
      :style="`background: url('${movie.imgUrl}');background-position: center;background-repeat: no-repeat;background-size: cover;`"
    >
      <div
        class="bg-gradient-to-r from-[#141414] via-[rgb(20,20,20,0.3)] to-[rgb(20,20,20,0.1)] h-full w-full"
      ></div>
      <div
        class="fixed top-0 bg-gradient-to-t from-[#141414] via-[rgb(20,20,20,0.3)] to-[rgb(20,20,20,0.1)] h-full w-full"
      ></div>
    </div>
    <div
      class="fixed top-0 left-0 overflow-auto max-h-screen h-full w-full flex items-center px-10"
    >
      <div class="max-w-[60vw] prose">
        <h1 class="flex gap-5">
          {{ movie.title }}
          <span
            class="flex items-center gap-2 text-xl bg-base-100 rounded-lg px-4"
            ><StarIcon color="yellow" /> {{ movie.rating }}</span
          >
          <span
            class="flex items-center gap-2 text-xl bg-base-100 rounded-lg px-4"
            ><GenreIcon /> {{ movie.Genre.name }}</span
          >
        </h1>
        <p>
          {{ movie.synopsis }}
        </p>
        <div class="flex gap-2 mt-6">
          <FavoriteButton :id="movie.id" />
          <button
            @click="toggleTrailer"
            class="btn btn-outline text-white flex gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clip-rule="evenodd"
              />
            </svg>

            Play Trailer
          </button>
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-10 right-10 w-44 h-52 flex flex-col justify-end items-center bg-[#ddd] p-3 rounded-xl gap-1 hover:scale-110 transition-all"
    >
      <div class="text-black font-bold text-xl">Scan Here!</div>
      <div>
        <img
          :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=ddd&data=${this.url}`"
        />
      </div>
    </div>
  </div>
  <div v-if="loading">
    <div
      class="fixed top-0 left-0 overflow-auto max-h-screen h-full w-full flex items-center px-10 animate-pulse"
    >
      <div class="max-w-[60vw] prose">
        <div class="flex gap-5">
          <div class="w-96 h-11 bg-base-100 rounded-xl"></div>
          <div class="w-24 h-11 bg-base-100 rounded-xl"></div>
          <div class="w-32 h-11 bg-base-100 rounded-xl"></div>
        </div>
        <div class="flex flex-col gap-3 mt-7">
          <div class="w-[60vw] h-5 bg-base-100 rounded-xl"></div>
          <div class="w-[61vw] h-5 bg-base-100 rounded-xl"></div>
          <div class="w-[55vw] h-5 bg-base-100 rounded-xl"></div>
          <div class="w-[59vw] h-5 bg-base-100 rounded-xl"></div>
          <div class="w-[56vw] h-5 bg-base-100 rounded-xl"></div>
        </div>
        <div class="flex gap-2 mt-8">
          <div class="bg-base-100 w-40 rounded-lg h-12"></div>
          <div class="border-4 border-base-100 rounded-lg w-40 h-12"></div>
        </div>
      </div>
    </div>
  </div>
</template>
