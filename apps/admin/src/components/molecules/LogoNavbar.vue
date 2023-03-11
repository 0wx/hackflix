<script>
import Role from '../atoms/Role.vue'
import Logo from '../atoms/Logo.vue'

export default {
  components: {
    Role,
    Logo,
  },
  props: ['user'],
}
</script>

<template>
  <div class="flex-grow flex items-center gap-2">
    <Logo />
    <Role v-if="user" :user="user" />
  </div>
</template>
