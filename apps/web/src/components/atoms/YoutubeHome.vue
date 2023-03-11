<script>
export default {
  props: ['id'],
}
</script>

<template>
  <div class="videoWrapper absolute z-0">
    <iframe
      width="560"
      height="315"
      :src="`https://www.youtube.com/embed/${id}?controls=0&autoplay=1&mute=1&loop=1&playlist=${id}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.videoWrapper {
  position: relative;
  height: 95vh;
  overflow: hidden;
}

.videoWrapper iframe {
  position: absolute;
  top: -20vh;
  left: -25vw;
  width: 150vw;
  height: 140vh;
}
</style>
