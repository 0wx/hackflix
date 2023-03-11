<script>
import InputForm from '../atoms/InputForm.vue'
import SubmitForm from '../atoms/SubmitForm.vue'

export default {
  emits: ['addMovie', 'editMovie'],
  data() {
    return {
      title: '',
      imgUrl: '',
      genreId: '',
      synopsis: '',
      rating: '',
      trailerUrl: '',
    }
  },
  props: ['genres', 'movie'],
  components: { InputForm, SubmitForm },
  created() {
    if (this.movie) {
      this.title = this.movie.title
      this.imgUrl = this.movie.imgUrl
      this.genreId = this.movie.genreId
      this.synopsis = this.movie.synopsis
      this.rating = this.movie.rating
      this.trailerUrl = this.movie.trailerUrl
    }
  },
  methods: {
    handleSubmit() {
      const data = {
        title: this.title,
        imgUrl: this.imgUrl,
        genreId: this.genreId,
        synopsis: this.synopsis,
        rating: this.rating,
        status: this.status,
        trailerUrl: this.trailerUrl,
      }

      if (this.movie) {
        this.$emit('editMovie', { ...data, id: this.movie.id })
        return
      }

      this.$emit('addMovie', data)
    },
  },
}
</script>

<template>
  <div class="w-full p-10" id="add-movie">
    <div class="text-3xl font-bold">
      {{ this.movie ? 'Edit' : 'Add' }} Movie
    </div>
    <div class="divider"></div>
    <form @submit.prevent="handleSubmit">
      <InputForm type="text" label="Tilte" :required="true" v-model="title" />
      <InputForm type="text" label="Poster" :required="true" v-model="imgUrl" />
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Genre</span>
          <span class="label-text-alt text-red-500">*</span>
        </label>
        <select v-model="genreId" class="select w-full max-w-xs">
          <option selected disabled>-- Pick a Genre --</option>
          <option
            v-for="genre in genres"
            :value="genre.id"
            :key="`genre-select-${genre.id}`"
          >
            {{ genre.name }}
          </option>
        </select>
      </div>

      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Synopsis</span>
          <span class="label-text-alt text-red-500">*</span>
        </label>
        <textarea
          class="textarea"
          placeholder="synopsis of the movie"
          v-model="synopsis"
        ></textarea>
      </div>
      <InputForm
        type="number"
        label="Rating"
        :required="true"
        v-model="rating"
      />
      <InputForm
        type="text"
        label="Trailer URL"
        :required="true"
        v-model="trailerUrl"
      />
      <br />
      <SubmitForm>Save</SubmitForm>
    </form>
  </div>
</template>
