<script>
import InputForm from '../atoms/InputForm.vue'
import SubmitForm from '../atoms/SubmitForm.vue'

export default {
  emits: ['addGenre'],
  props: ['genre'],
  components: {
    InputForm,
    SubmitForm,
  },
  data() {
    return { name: '' }
  },
  created() {
    if (this.genre) {
      this.name = this.genre.name
    }
  },
  methods: {
    handleAddGenre() {
      this.$emit('addGenre', { name: this.name })
    },
  },
}
</script>

<template>
  <div class="w-full p-10" id="add-genre">
    <div class="text-3xl font-bold">Add Genre</div>
    <div class="divider"></div>
    <form @submit.prevent="handleAddGenre">
      <InputForm label="Genre name" v-model="name" />
      <br />
      <SubmitForm>Save</SubmitForm>
    </form>
  </div>
</template>
