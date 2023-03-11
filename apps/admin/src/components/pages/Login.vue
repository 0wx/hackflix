<script>
import LoginForm from '../molecules/LoginForm.vue'
import SignupForm from '../molecules/SignupForm.vue'

export default {
  emits: ['login', 'register', 'google'],
  components: {
    LoginForm,
    SignupForm,
  },
}
</script>

<template>
  <div
    class="w-full p-10 flex flex-col items-center justify-center gap-10"
    id="login"
  >
    <div class="text-center">
      <h1 class="font-bold text-3xl mb-3">Login Options</h1>
      <p>
        Log in and autocomplete your order with your personal data, or sign up
        to enjoy all the benefits of an IDEA account.
      </p>
    </div>
    <div class="flex justify-center flex-col md:flex-row">
      <SignupForm @register="$emit('register', $event)" />
      <div class="divider md:divider-horizontal"></div>
      <LoginForm
        @login="$emit('login', $event)"
        @google="$emit('google', $event)"
      />
    </div>
  </div>
</template>
