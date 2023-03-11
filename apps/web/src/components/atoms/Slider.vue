<script>
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'
import { mapWritableState } from 'pinia'
import { useMoviesStore } from '../../stores/movies'

export default {
  components: {
    Slider,
  },
  computed: mapWritableState(useMoviesStore, ['rating']),
}
</script>

<template>
  <div class="flex justify-between">
    <div v-for="number in 10" :key="number">{{ number }}</div>
  </div>
  <div class="w-[98%] pl-1">
    <Slider
      v-model="rating"
      :min="1"
      :max="10"
      tooltipPosition="bottom"
      showTooltip="drag"
      class="slider-red"
    />
  </div>
</template>
