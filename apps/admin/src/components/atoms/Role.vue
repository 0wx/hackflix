<script>
export default {
  props: ['user'],
}
</script>

<template>
  <span
    :class="`${
      user.role === 'admin' ? 'bg-yellow-400' : 'bg-blue-400'
    } rounded text-xs py-1 px-2 font-bold`"
    >{{ user.role.toUpperCase() }}</span
  >
</template>
