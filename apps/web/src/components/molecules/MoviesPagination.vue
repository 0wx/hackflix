<script>
import { mapActions, mapState } from 'pinia'
import { useMoviesStore } from '../../stores/movies'

export default {
  computed: mapState(useMoviesStore, ['currentPage', 'totalPage']),
  methods: mapActions(useMoviesStore, ['next', 'prev']),
}
</script>

<template>
  <button @click="prev" class="btn">«</button>
  <button class="btn">Page {{ currentPage }} / {{ totalPage }}</button>
  <button @click="next" class="btn">»</button>
</template>
