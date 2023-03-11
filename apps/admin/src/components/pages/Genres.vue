<script>
import GenreRow from '../molecules/GenreRow.vue'
import SearchFormMobile from '../molecules/SearchFormMobile.vue'
import TableList from '../organisms/TableList.vue'

export default {
  emits: ['changePage', 'delete', 'search'],
  components: { GenreRow, TableList, SearchFormMobile },
  props: ['genres'],
}
</script>

<template>
  <div class="w-full p-10" id="genres">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Genres</div>
      <button @click="$emit('changePage', 'add-genre')" class="btn">
        Add Genre
      </button>
    </div>
    <div class="divider"></div>
    <SearchFormMobile @search="$emit('search', $event)" endpoint="genres" />
    <div class="overflow-x-auto">
      <TableList :headers="['', 'Name', '']">
        <GenreRow
          v-for="(genre, index) in genres"
          :key="'genre-' + genre.id"
          :genre="genre"
          :index="index"
          @delete="$emit('delete', $event)"
        />
      </TableList>
    </div>
  </div>
</template>
