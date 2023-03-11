<script>
import ms from 'ms'

export default {
  props: ['log', 'index'],
  methods: {
    format() {
      return ms(Date.now() - new Date(this.log.createdAt).getTime(), {
        long: true,
      })
    },
  },
}
</script>

<template>
  <tr>
    <th>{{ index + 1 }}</th>
    <td>{{ log.title }}</td>
    <td>{{ log.description }}</td>
    <td>{{ format() }} ago</td>
    <td>{{ log.updatedBy }}</td>
  </tr>
</template>
