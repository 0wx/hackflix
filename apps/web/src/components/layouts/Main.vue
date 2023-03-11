<script>
import Navbar from '../organisms/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>

<template>
  <div class="bg-[#141414] min-h-screen">
    <Navbar />
    <slot />
  </div>
</template>
