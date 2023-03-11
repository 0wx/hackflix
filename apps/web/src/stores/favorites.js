import { defineStore } from 'pinia'
import { api } from '../helpers/axios'

export const useFavoritesStore = defineStore('favorites', {
  state: () => {
    return { favorites: [], loading: false }
  },
  actions: {
    async fetchFavorites(hideNotif) {
      try {
        this.loading = true
        const { data } = await api.get('/pub/customer/favorites')
        this.favorites = data
      } catch (error) {
        if (hideNotif) return
        this.$notify({
          group: 'error',
          title: 'Error',
          text: error.response.data.message,
        })
      } finally {
        this.loading = false
      }
    },

    async add(id) {
      console.log(id)
      try {
        this.loading = true
        await api.post('/pub/customer/favorites/' + id)
        await this.fetchFavorites()
      } catch (error) {
        this.$notify({
          group: 'error',
          title: 'Error',
          text: error.response.data.message,
        })
      } finally {
        this.loading = false
      }
    },
    async remove(id) {
      try {
        this.loading = true
        await api.delete('/pub/customer/favorites/' + id)
        await this.fetchFavorites()
      } catch (error) {
        this.$notify({
          group: 'error',
          title: 'Error',
          text: error.response.data.message,
        })
      } finally {
        this.loading = false
      }
    },
  },
})
