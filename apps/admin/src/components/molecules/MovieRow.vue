<script>
import { getYoutubeId } from '../../helpers/regex'
import EditIcon from '../atoms/EditIcon.vue'

export default {
  data() {
    return {
      viewTrailer: false,
      getYoutubeId: getYoutubeId,
    }
  },
  props: ['movie', 'user'],
  emits: ['status', 'edit'],
  methods: {
    handleStatus(e) {
      const data = {
        id: this.movie.id,
        status: e.target.value,
      }
      this.$emit('status', data)
    },

    toggleView() {
      this.viewTrailer = !this.viewTrailer
    },
  },
  components: { EditIcon },
}
</script>

<template>
  <div
    v-if="viewTrailer"
    @click="toggleView"
    class="fixed top-0 left-0 z-[999] h-screen w-screen bg-[rgb(0,0,0,0.2)] flex justify-center items-center"
  >
    <iframe
      width="560"
      height="315"
      :src="`https://www.youtube.com/embed/${getYoutubeId(movie.trailerUrl)}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="z-[1000]"
    ></iframe>
  </div>
  <tr>
    <th>
      <div @click="toggleView" class="avatar">
        <div class="w-40 h-60">
          <div
            class="absolute inset-0 cursor-pointer z-10 bg-white text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300"
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

            <div>Watch</div>
            <div>Trailer</div>
          </div>
          <img :src="movie.imgUrl" class="rounded-xl" :alt="movie.title" />
        </div>
      </div>
    </th>
    <td>
      <div>
        <div class="font-bold">{{ movie.title }}</div>
        <div class="text-sm opacity-50">{{ movie.Genre.name }}</div>
        <div class="rating rating-xs">
          <input
            v-for="r in 5"
            type="radio"
            name="rating-5"
            class="mask mask-star-2 bg-orange-400"
            :key="`r${movie.id}${r}`"
            :checked="Math.ceil(movie.rating / 2) === r"
          />
        </div>
      </div>
    </td>
    <td>
      {{ movie.User.username }}
      <br />
      <span class="badge badge-ghost badge-sm">{{ movie.User.email }}</span>
    </td>
    <td>
      <p class="whitespace-pre-wrap overflow-auto h-60">{{ movie.synopsis }}</p>
    </td>
    <td class="w-40">
      <div v-if="user.role === 'staff'" class="font-bold">
        {{ movie.status }}
      </div>
      <select
        v-if="user.role === 'admin'"
        @change="handleStatus"
        class="select select-bordered w-full max-w-xs"
        id=""
      >
        <option value="active" :selected="movie.status === 'active'">
          active
        </option>
        <option value="inactive" :selected="movie.status === 'inactive'">
          inactive
        </option>
        <option value="archived" :selected="movie.status === 'archived'">
          archived
        </option>
      </select>
    </td>
    <td class="w-20">
      <button
        v-if="user.id === movie.User.id || user.role === 'admin'"
        class="btn btn-ghost"
        @click="$emit('edit', movie)"
      >
        <EditIcon />
      </button>
    </td>
  </tr>
</template>
