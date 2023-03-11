<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
import { RouterLink } from 'vue-router'
import { GoogleLogin } from 'vue3-google-login'
// import GoogleIcon from '../components/atoms/GoogleIcon.vue'
export default {
  data() {
    return { email: '', password: '', to: null }
  },
  components: {
    RouterLink,
    GoogleLogin,
    // GoogleIcon,
  },
  methods: {
    ...mapActions(useUserStore, ['login', 'loginGoogle']),
    handleSubmit() {
      this.login(
        { email: this.email, password: this.password },
        undefined,
        this.to
      )
    },
  },

  created() {
    this.to = this.$route.query.to
  },
}
</script>

<template>
  <div
    class="flex justify-center items-center min-h-screen bg-[linear-gradient(rgba(0,0,0,0.80),rgba(0,0,0,0.80)),url(/bg.jpg)] bg-center bg-cover"
  >
    <div class="prose bg-black p-16 rounded-lg bg-opacity-70">
      <h1>Sign In</h1>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
        <input
          type="text"
          class="input input-bordered"
          placeholder="Email"
          v-model="email"
        />
        <input
          type="password"
          class="input input-bordered"
          placeholder="Password"
          v-model="password"
        />
        <button
          class="btn bg-[#E50914] hover:bg-[#E50914] border-none text-black"
        >
          Login
        </button>
      </form>
      <div class="divider">or</div>
      <div class="flex justify-center">
        <GoogleLogin :callback="loginGoogle" />
      </div>
      <br />
      <div>
        Don't have an account yet?
        <RouterLink :to="{ name: 'signup', query: { to } }">Sign Up</RouterLink>
      </div>
    </div>
  </div>
</template>
