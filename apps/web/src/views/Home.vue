<script>
import Carousel from '../components/organisms/Carousel.vue'
import MovieBanner from '../components/organisms/MovieBanner.vue'

export default {
  components: {
    Carousel,
    MovieBanner,
  },
}
</script>

<template>
  <MovieBanner />
  <Carousel title="Latest Movie" :params="{ sortby: 'createdAt-desc' }" />
  <Carousel
    title="Best Movie"
    :params="{ sortby: 'rating-desc', rating: '9-10' }"
  />
  <Carousel title="Top Pick" />
</template>
