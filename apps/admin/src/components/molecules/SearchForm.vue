<script>
import SearchIcon from '../atoms/SearchIcon.vue'

export default {
  emits: ['search'],
  props: ['page'],
  data() {
    return {
      search: '',
      endpoint: 'movies',
    }
  },
  components: {
    SearchIcon,
  },
  methods: {
    handleSearch() {
      const config = { search: this.search, endpoint: this.endpoint }
      this.$emit('search', config)
    },
    handleChange(e) {
      this.endpoint = e.target.value
    },
  },
  created() {
    if (this.page === 'genres') {
      this.endpoint = this.page
    }
  },
  watch: {
    page(newPage) {
      if (newPage === 'genres' || newPage === 'movies') {
        this.endpoint = newPage
      }
    },
  },
}
</script>

<template>
  <form method="get" class="hidden md:block" @submit.prevent="handleSearch">
    <div class="form-control">
      <div class="input-group">
        <input
          type="search"
          placeholder="Search"
          class="input focus:outline-none"
          v-model="search"
          required
        />
        <select @change="handleChange" class="select focus:outline-none">
          <option value="movies" :selected="page === 'movies'">Movie</option>
          <option value="genres" :selected="page === 'genres'">Genre</option>
        </select>
        <button class="btn btn-square bg-white border-none hover:bg-slate-100">
          <SearchIcon />
        </button>
      </div>
    </div>
  </form>
</template>
