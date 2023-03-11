import { defineStore } from 'pinia'
import { api } from '../helpers/axios'

export const useMoviesStore = defineStore('movies', {
  state: () => {
    return {
      loading: false,
      movies: [],
      search: '',
      totalPage: 0,
      currentPage: 1,
      perPage: 10,
      genreId: null,
      rating: [1, 10],
      sortby: null,
    }
  },
  actions: {
    async getMovies() {
      try {
        this.loading = true
        const { data } = await api.get('/pub/movies', {
          params: {
            search: this.search,
            perPage: this.perPage,
            page: this.currentPage,
            genre: this.genreId,
            rating: this.rating.join('-'),
            sortby: this.sortby,
          },
        })
        this.movies = data.movies
        this.totalPage = +data.totalPage
        this.currentPage = +data.currentPage
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

    async next() {
      if (this.currentPage >= this.totalPage) return
      this.currentPage++
      await this.getMovies()
    },
    async prev() {
      if (this.currentPage <= 1) return
      this.currentPage--
      await this.getMovies()
    },

    resetState() {
      this.$reset()
    },

    getMovieDetail(id) {
      return api.get('/pub/movies/' + id)
    },
    getMoviesCustom(params) {
      return api.get('/pub/movies', { params })
    },
    getMovieRandom() {
      return api.get('/pub/movies/random')
    },
  },
})
