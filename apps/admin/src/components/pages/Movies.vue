<script>
import MovieRow from '../molecules/MovieRow.vue'
import SearchFormMobile from '../molecules/SearchFormMobile.vue'
import TableList from '../organisms/TableList.vue'
export default {
  emits: ['changePage', 'status', 'edit', 'search'],
  props: ['movies', 'user'],
  components: { MovieRow, TableList, SearchFormMobile },
}
</script>

<template>
  <div class="w-full p-10" id="movies">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Movies</div>
      <button @click="$emit('changePage', 'add-movie')" class="btn">
        Add Movie
      </button>
    </div>
    <div class="divider"></div>
    <SearchFormMobile @search="$emit('search', $event)" endpoint="movies" />
    <div class="overflow-x-auto w-full">
      <TableList
        :headers="[
          'Poster',
          'Title & genre',
          'Author',
          'Synopsis',
          'Status',
          'Edit',
        ]"
      >
        <MovieRow
          v-for="movie in movies"
          @status="$emit('status', $event)"
          @edit="$emit('edit', $event)"
          :key="'movie-' + movie.id"
          :movie="movie"
          :user="user"
        />
      </TableList>
    </div>
  </div>
</template>
