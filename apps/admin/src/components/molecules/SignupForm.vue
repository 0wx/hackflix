<script>
import InputForm from '../atoms/InputForm.vue'
import SubmitForm from '../atoms/SubmitForm.vue'

export default {
  emits: ['register'],
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
    }
  },
  components: {
    InputForm,
    SubmitForm,
  },
}
</script>

<template>
  <div class="md:w-1/2 md:p-10">
    <h1 class="text-xl font-bold">Sign Up and Enjoy</h1>
    <br />
    <form
      @submit.prevent="
        $emit('register', { username, email, password, phoneNumber, address })
      "
    >
      <InputForm
        type="text"
        label="Username"
        name="username"
        :required="true"
        v-model="username"
      />
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
      <InputForm
        type="number"
        label="Phone number"
        name="phoneNumber"
        v-model="phoneNumber"
      />
      <InputForm type="text" label="Address" name="address" v-model="address" />
      <SubmitForm>Sign Up</SubmitForm>
    </form>
  </div>
</template>
