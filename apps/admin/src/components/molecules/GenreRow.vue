<script>
import TrashIcon from '../atoms/TrashIcon.vue'

export default {
  emits: ['delete'],
  props: ['genre', 'index'],
  components: { TrashIcon },
}
</script>

<template>
  <tr>
    <th>{{ index + 1 }}</th>
    <td class="w-full">{{ genre.name }}</td>
    <td class="flex justify-center items-center">
      <button @click="$emit('delete', genre)" class="btn btn-ghost">
        <TrashIcon />
      </button>
    </td>
  </tr>
</template>
