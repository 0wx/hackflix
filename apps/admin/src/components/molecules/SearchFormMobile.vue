<script>
import SearchIcon from '../atoms/SearchIcon.vue'

export default {
  emits: ['search'],
  props: ['endpoint'],
  data() {
    return {
      search: '',
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
  },
}
</script>

<template>
  <div class="py-2">
    <form method="get" class="md:hidden" @submit.prevent="handleSearch">
      <div class="form-control">
        <div class="input-group">
          <input
            type="text"
            placeholder="Search"
            class="input focus:outline-none w-full"
            v-model="search"
            required
          />
          <button
            class="btn btn-square bg-white border-none hover:bg-slate-100"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
