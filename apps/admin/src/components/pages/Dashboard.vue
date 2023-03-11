<script>
import Statistics from '../atoms/Statistics.vue'

export default {
  props: ['statistics'],
  components: {
    Statistics,
  },
}
</script>

<template>
  <div class="w-full p-10" id="dashboard">
    <div class="text-3xl font-bold">Dashboard</div>
    <div class="divider"></div>
    <div class="flex gap-10 flex-wrap">
      <Statistics title="Total Movie" :value="statistics.totalMovie" />
      <Statistics title="Total Genre" :value="statistics.totalGenre" />
    </div>
  </div>
</template>
