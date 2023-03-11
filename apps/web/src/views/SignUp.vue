<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
import { GoogleLogin } from 'vue3-google-login'

export default {
  components: {
    GoogleLogin,
  },
  data() {
    return { email: '', password: '', to: null }
  },
  methods: {
    ...mapActions(useUserStore, ['register', 'loginGoogle']),
    handleSubmit() {
      this.register({ email: this.email, password: this.password })
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
      <h1>Sign Up</h1>
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
          type="submit"
          class="btn bg-[#E50914] hover:bg-[#E50914] border-none text-black"
        >
          Sign Up
        </button>
      </form>
      <div class="divider">or</div>
      <div class="flex justify-center">
        <GoogleLogin :callback="loginGoogle" />
      </div>
      <br />
      <div>
        Already had an account?
        <RouterLink :to="{ name: 'login', query: { to } }">Login</RouterLink>
      </div>
    </div>
  </div>
</template>
