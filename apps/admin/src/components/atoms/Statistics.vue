<script>
export default {
  props: ['title', 'value'],
}
</script>

<template>
  <div
    class="bg-white shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow rounded-md p-5 w-60"
  >
    <h2 class="font-bold text-xl">{{ title }}</h2>
    <h1 class="text-6xl font-bold font-sans">{{ value }}</h1>
  </div>
</template>
