<script>
import InputForm from '../atoms/InputForm.vue'
import SubmitForm from '../atoms/SubmitForm.vue'
import { GoogleLogin } from 'vue3-google-login'

export default {
  emits: ['login', 'google'],
  data() {
    return {
      email: '',
      password: '',
    }
  },
  components: {
    InputForm,
    SubmitForm,
    GoogleLogin,
  },
  methods: {
    handleLoginGoogle(response) {
      this.$emit('google', response.credential)
    },
  },
}
</script>

<template>
  <div class="md:w-1/2 md:p-10">
    <h1 class="text-xl font-bold">Login to your account</h1>
    <div class="text-xs">
      Log in on your profile to autocomplete your purchase order with your
      personal data.
    </div>
    <br />
    <form @submit.prevent="$emit('login', { email, password })">
      <InputForm
        type="text"
        label="Email"
        name="email"
        :required="true"
        v-model="email"
      />
      <InputForm
        type="password"
        label="Password"
        name="password"
        :required="true"
        v-model="password"
      />
      <SubmitForm>Login</SubmitForm>
      <br />
      <div class="divider max-w-xs">Or</div>
      <br />
      <div class="max-w-xs flex justify-center">
        <GoogleLogin :callback="handleLoginGoogle" />
      </div>
    </form>
  </div>
</template>
