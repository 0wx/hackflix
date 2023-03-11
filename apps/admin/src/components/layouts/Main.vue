<script>
import Navbar from '../organisms/Navbar.vue'
import Sidebar from '../molecules/Sidebar.vue'

export default {
  emits: ['changePage', 'logout', 'search'],
  data() {
    return {
      sidebarClass: '-translate-x-48',
    }
  },
  props: ['user', 'page'],
  components: {
    Navbar,
    Sidebar,
  },
  methods: {
    handleToggleShow() {
      if (!this.sidebarClass) {
        this.sidebarClass = '-translate-x-48'
      } else {
        this.sidebarClass = ''
      }
    },
  },
}
</script>

<template>
  <Navbar
    @toggleShow="handleToggleShow"
    @logout="$emit('logout')"
    @search="$emit('search', $event)"
    :user="user"
    :page="page"
  />
  <Sidebar
    :sidebarClass="sidebarClass"
    @changePage="$emit('changePage', $event)"
    :page="page"
    v-if="user"
  />
  <div :class="`pt-20 ${user ? 'sm:pl-48' : ''} bg-slate-100 min-h-screen`">
    <div>
      <slot />
    </div>
  </div>
</template>
