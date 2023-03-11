<script>
import BurgerIcon from '../atoms/BurgerIcon.vue'

export default {
  emits: ['toggleShow'],
  components: {
    BurgerIcon,
  },
}
</script>

<template>
  <button class="sm:hidden btn btn-ghost" @click="$emit('toggleShow')">
    <BurgerIcon />
  </button>
</template>
