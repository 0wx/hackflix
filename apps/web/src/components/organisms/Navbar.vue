<script>
import LoginSignupButton from '../atoms/LoginSignupButton.vue'
import NavbarLogo from '../atoms/NavbarLogo.vue'
import NavbarList from '../molecules/NavbarList.vue'
import NavbarProfile from '../molecules/NavbarProfile.vue'

export default {
  data() {
    return {
      onscroll: false,
    }
  },
  components: {
    NavbarList,
    LoginSignupButton,
    NavbarLogo,
    NavbarProfile,
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (!this.onscroll && window.scrollY > 0) {
        this.onscroll = true
        return
      }

      if (this.onscroll && window.scrollY === 0) {
        this.onscroll = false
        return
      }
    },
  },
}
</script>

<template>
  <div
    :class="`fixed top-0 z-50 h-16 px-10 w-full flex items-center bg-gradient-to-b from-neutral-900 ${
      onscroll && 'shadow-lg backdrop-blur-sm to-neutral-900 '
    }`"
  >
    <div class="flex-grow flex items-center gap-10 pl-1">
      <NavbarLogo />
      <NavbarList />
    </div>
    <LoginSignupButton />
    <NavbarProfile />
  </div>
</template>
