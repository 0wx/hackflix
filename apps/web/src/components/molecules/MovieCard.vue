<script>
import { getYoutubeId } from '../../helpers/regex'
import InfoIcon from '../atoms/InfoIcon.vue'
import FavoriteButton from './FavoriteButton.vue'

export default {
  components: {
    InfoIcon,
    FavoriteButton,
  },
  props: ['movie'],
  data() {
    return {
      onhover: false,
      youtubeId: '',
    }
  },
  methods: {
    toggleHover() {
      this.onhover = !this.onhover
    },
  },
  created() {
    if (this.movie) {
      this.youtubeId = getYoutubeId(this.movie.trailerUrl)
    }
  },
}
</script>

<template>
  <div
    v-if="movie"
    class="w-96 h-48 rounded-lg hover:scale-110 z-10 hover:z-50 transition-all bg-black duration-500"
    :style="
      !onhover
        ? `background: url(${movie.imgUrl}); background-size: cover; background-position: center; z-index: 1;`
        : 'z-index: 50;'
    "
    @mouseenter="toggleHover"
    @mouseleave="toggleHover"
  >
    <iframe
      v-if="onhover"
      width="384"
      height="150"
      :src="`https://www.youtube.com/embed/${youtubeId}?controls=0&autoplay=1&mute=0&loop=1&playlist=${youtubeId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
    <div
      :class="`flex flex-col w-full relative bottom-0 px-5 font-bold bg-black bg-opacity-40 ${
        !onhover ? 'py-5 h-full bg-opacity-40' : 'py-2 bg-opacity-100'
      }`"
    >
      <div class="flex justify-between w-full transition-all">
        <RouterLink :to="`/movies/${movie.id}`">
          <div class="truncate max-w-[250px]">
            {{ movie.title }}
          </div>
        </RouterLink>
        <div v-if="true" class="flex justify-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="yellow"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clip-rule="evenodd"
            />
          </svg>
          {{ movie.rating }}
        </div>
      </div>
      <div v-if="onhover" class="flex gap-5 justify-end">
        <div class="flex gap-2 text-sm">
          <FavoriteButton :id="movie.id" :small="true" />
          <RouterLink :to="`/movies/${movie.id}`">
            <button class="btn btn-ghost btn-sm flex gap-2 text-xs">
              <InfoIcon />
              Detail
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <!-- for testing -->
  <div
    v-if="!movie"
    :class="`w-96 h-48 rounded-lg hover:scale-125 transition-all bg-black ${
      !onhover
        ? `bg-[url('https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Spirited_Away_Japanese_poster.png/220px-Spirited_Away_Japanese_poster.png')] bg-cover bg-center filter z-0`
        : 'z-40'
    }`"
    @mouseenter="toggleHover"
    @mouseleave="toggleHover"
  >
    <iframe
      v-if="onhover"
      width="384"
      height="150"
      src="https://www.youtube.com/embed/ByXuk9QqQkk?controls=0&autoplay=1&mute=0&loop=1&playlist=ByXuk9QqQkk"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
    <div
      :class="`flex w-full relative bottom-0 px-5 font-bold bg-black bg-opacity-30 gap-4 ${
        !onhover ? 'py-5 h-full' : 'py-2'
      }`"
    >
      <RouterLink to="/movies/1">
        <div class="truncate max-w-[270px]">
          Spirited Away asdasdasdasdasdasd asd asd asd asdasdas
        </div>
      </RouterLink>
      <div v-if="onhover" class="flex justify-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="yellow"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clip-rule="evenodd"
          />
        </svg>
        10
      </div>
    </div>
  </div>
</template>
