<script>
import { mapActions, mapState } from 'pinia'
import { useFavoritesStore } from '../../stores/favorites'
export default {
  props: ['small', 'id'],
  data() {
    return {
      favorited: false,
    }
  },
  computed: {
    ...mapState(useFavoritesStore, ['favorites', 'loading']),
  },
  methods: {
    ...mapActions(useFavoritesStore, ['add', 'remove']),
    updateFavorited() {
      this.favorited = this.favorites.find(({ id }) => id === this.id)
    },
    async handleClick() {
      try {
        if (this.favorited) {
          await this.remove(this.id)
        } else {
          await this.add(this.id)
        }

        this.updateFavorited()
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.updateFavorited()
  },
  watch: {
    favorites() {
      this.updateFavorited()
    },
  },
}
</script>

<template>
  <button
    v-if="!small"
    class="btn bg-white text-black hover:bg-base-content flex gap-2"
    :disabled="loading"
    @click="handleClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      :fill="favorited ? 'red' : 'currentColor'"
      class="w-6 h-6"
    >
      <path
        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
      />
    </svg>

    {{ favorited ? 'Favorited' : 'Add Favorite' }}
  </button>
  <button
    v-if="small"
    :disabled="loading"
    class="btn btn-ghost btn-sm flex gap-2 text-xs"
    @click="handleClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      :fill="favorited ? 'red' : 'currentColor'"
      class="w-6 h-6"
    >
      <path
        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
      />
    </svg>
    {{ favorited ? 'Added' : 'Add' }}
  </button>
</template>
