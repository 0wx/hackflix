<script>
import { mapWritableState } from 'pinia'
import { useMoviesStore } from '../../stores/movies'

export default {
  data() {
    return {
      options: [
        {
          by: 'title',
          label: 'Title',
          options: [
            { label: 'A-Z', type: 'asc' },
            { label: 'Z-A', type: 'desc' },
          ],
        },
        {
          by: 'createdAt',
          label: 'Uploaded',
          options: [
            { label: 'Oldest', type: 'asc' },
            { label: 'Newest', type: 'desc' },
          ],
        },
        {
          by: 'rating',
          label: 'Rating',
          options: [
            { label: 'Low to High', type: 'asc' },
            { label: 'High to Low', type: 'desc' },
          ],
        },
      ],
      typeOptions: [
        { label: 'A-Z', type: 'asc' },
        { label: 'Z-A', type: 'desc' },
      ],
      by: null,
      sortType: 'asc',
    }
  },

  computed: mapWritableState(useMoviesStore, ['sortby']),
  methods: {
    handleChange() {
      if (this.by && this.sortType) {
        this.sortby = `${this.by}-${this.sortType}`
        return
      }

      this.sortby = null
    },
  },
  watch: {
    by(to) {
      if (to)
        this.typeOptions = this.options.find(({ by }) => by === to).options
      this.handleChange()
    },
    sortType() {
      this.handleChange()
    },
  },
}
</script>

<template>
  <div class="flex flex-col mt-2 gap-2">
    <span class="font-bold">Sort By</span>
    <div class="form-control">
      <div class="input-group">
        <select v-model="by" class="select select-bordered">
          <option :value="null">Nothing</option>
          <option v-for="(option, i) in options" :key="i" :value="option.by">
            {{ option.label }}
          </option>
        </select>
        <select v-if="by" v-model="sortType" class="select select-bordered">
          <option v-for="(opt, i) in typeOptions" :key="i" :value="opt.type">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
