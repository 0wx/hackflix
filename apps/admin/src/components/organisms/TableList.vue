<script>
export default {
  props: ['headers', 'compact'],
}
</script>

<template>
  <table :class="`table w-full z-10 ${compact ? 'table-compact' : ''}`">
    <thead>
      <tr>
        <th v-for="head in headers" :key="head">{{ head }}</th>
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>
