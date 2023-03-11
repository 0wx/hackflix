<script>
import SearchForm from '../molecules/SearchForm.vue'
import ProfileNavbar from '../molecules/ProfileNavbar.vue'
import LogoNavbar from '../molecules/LogoNavbar.vue'
import Burger from '../molecules/Burger.vue'

export default {
  emits: ['toggleShow', 'logout', 'search'],
  components: {
    SearchForm,
    ProfileNavbar,
    LogoNavbar,
    Burger,
  },
  props: ['user', 'page'],
  methods: {
    handleToggleShow() {
      this.$emit('toggleShow')
    },
  },
}
</script>

<template>
  <nav
    class="flex items-center py-5 sm:px-9 px-5 gap-1 sm:gap-5 bg-slate-50 shadow h-20 fixed w-full z-[100]"
    id="navbar"
  >
    <Burger v-if="user" @toggleShow="handleToggleShow" />
    <LogoNavbar :user="user" />
    <SearchForm v-if="user" @search="$emit('search', $event)" :page="page" />
    <ProfileNavbar v-if="user" :user="user" @logout="$emit('logout')" />
  </nav>
</template>
