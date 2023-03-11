import { defineStore } from 'pinia'
import { api } from '../helpers/axios'

export const useGenresStore = defineStore('genres', {
  state: () => {
    return { genres: [], selected: 'A', selectedGenre: [], loading: false }
  },
  getters: {
    letters() {
      let letters = []
      for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        letters.push(String.fromCharCode([i]))
      }
      return letters
    },
  },
  actions: {
    select(letter) {
      this.selected = letter
    },

    async fetchGenres() {
      try {
        this.loading = true
        const { data } = await api.get('/pub/genres', {
          params: { letter: this.selected },
        })
        this.selectedGenre = data
      } catch (error) {
        console.log(error)
        this.$notify({
          group: 'error',
          title: 'Error',
          text: 'Something went wrong',
        })
      } finally {
        this.loading = false
      }
    },

    async fetchAllGenres() {
      try {
        this.loading = true
        const { data } = await api.get('/pub/genres')
        this.genres = data
      } catch (error) {
        console.log(error)
        this.$notify({
          group: 'error',
          title: 'Error',
          text: 'Something went wrong',
        })
      } finally {
        this.loading = false
      }
    },
  },
})
