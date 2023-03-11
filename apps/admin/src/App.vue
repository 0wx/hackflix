<script>
import MainLayout from './components/layouts/Main.vue'
import Login from './components/pages/Login.vue'
import Dashboard from './components/pages/Dashboard.vue'
import Movies from './components/pages/Movies.vue'
import AddMovie from './components/pages/AddMovie.vue'
import Genres from './components/pages/Genres.vue'
import AddGenre from './components/pages/AddGenre.vue'
import Logs from './components/pages/Logs.vue'
import { api } from './helpers/axios'
import { getUser } from './helpers/user'

export default {
  components: {
    MainLayout,
    Login,
    Dashboard,
    Movies,
    AddMovie,
    Genres,
    AddGenre,
    Logs,
  },
  data() {
    return {
      page: 'login',
      user: null,
      statistics: {
        totalMovie: 0,
        totalGenre: 0,
      },
      movies: [],
      genres: [],
      logs: [],
      movieToEdit: null,
    }
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.getStatistics()
      this.page = 'dashboard'
      this.user = getUser()
    }
  },
  methods: {
    load(page) {
      if (page === 'dashboard') {
        this.getStatistics()
      }
      if (page === 'movies') {
        this.getMovies()
      }
      if (page === 'genres' || page === 'add-movie') {
        this.getGenres()
      }
      if (page === 'logs') {
        this.getLogs()
      }
    },
    async handleChangePage(page, reload) {
      if (this.page === page && reload) {
        this.load(page)
        return
      }
      this.page = page
    },

    async handleLogin(credentials) {
      const loader = this.$loading.show()
      try {
        const { data } = await api.post('/login', credentials)
        const { access_token } = data
        localStorage.setItem('access_token', access_token)
        this.user = getUser()
        this.$swal({ icon: 'success', title: 'Successfuly login' })
        this.handleChangePage('dashboard')
      } catch (error) {
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    async handleRegister(user) {
      const loader = this.$loading.show()
      try {
        const { data } = await api.post('/register', user)
        const { access_token } = data
        localStorage.setItem('access_token', access_token)
        this.user = getUser()
        this.handleChangePage('dashboard')
        this.$swal({ icon: 'success', title: 'Successfuly registered' })
      } catch (error) {
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    async handleGoogleLogin(token) {
      const loader = this.$loading.show()
      try {
        const { data } = await api.post('/google-sign-in', null, {
          headers: {
            'google-auth-token': token,
          },
        })

        const { access_token } = data
        localStorage.setItem('access_token', access_token)
        this.user = getUser()
        this.handleChangePage('dashboard')

        this.$swal({
          icon: 'success',
          title: 'Successfuly logged in with google',
        })
      } catch (error) {
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    handleLogout() {
      localStorage.removeItem('access_token')
      this.handleChangePage('login')
      this.user = null
    },

    async getStatistics() {
      const loader = this.$loading.show()
      try {
        const movie = await api.get('/movies')
        const genre = await api.get('/genres')

        this.statistics.totalMovie = movie.data.length
        this.statistics.totalGenre = genre.data.length
      } catch (error) {
        if (error.response.status === 401) this.handleLogout()
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    async getMovies(search) {
      const loader = this.$loading.show()
      try {
        const movies = await api.get('/movies', { params: { search } })
        this.movies = movies.data
      } catch (error) {
        if (error.response.status === 401) this.handleLogout()
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    async getGenres(search) {
      const loader = this.$loading.show()
      try {
        const genres = await api.get('/genres', { params: { search } })
        this.genres = genres.data
      } catch (error) {
        if (error.response.status === 401) this.handleLogout()
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    async getLogs() {
      const loader = this.$loading.show()
      try {
        const logs = await api.get('/history')
        this.logs = logs.data
      } catch (error) {
        if (error.response.status === 401) this.handleLogout()
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    async handleStatusChange({ id, status }) {
      const loader = this.$loading.show()
      try {
        await api.patch(`/movies/${id}`, { status })
        this.$swal({ icon: 'success', title: 'Success updating movie status!' })
      } catch (error) {
        if (error.response.status === 401) this.handleLogout()
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    async handleAddMovie(movie) {
      const loader = this.$loading.show()
      try {
        await api.post(`/movies`, movie)
        this.$swal({ icon: 'success', title: 'Success add new movie!' })
        this.handleChangePage('movies')
      } catch (error) {
        if (error.response.status === 401) this.handleLogout()
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    async handleAddGenre(genre) {
      const loader = this.$loading.show()
      try {
        await api.post(`/genres`, genre)
        this.$swal({ icon: 'success', title: 'Success add new genre!' })
        this.handleChangePage('genres')
      } catch (error) {
        if (error.response.status === 401) this.handleLogout()
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    handleEdit(movie) {
      this.movieToEdit = movie
      this.handleChangePage('add-movie')
    },

    async handleEditMovie(movie) {
      const loader = this.$loading.show()
      try {
        await api.put(`/movies/${movie.id}`, movie)
        this.$swal({ icon: 'success', title: 'Success edit movie!' })
        this.handleChangePage('movies')
      } catch (error) {
        if (error.response.status === 401) this.handleLogout()
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    async handleDeleteGenre(genre) {
      const loader = this.$loading.show()
      try {
        await api.delete(`/genres/${genre.id}`)
        this.$swal({ icon: 'success', title: 'Success removing genre!' })
        this.handleChangePage('genres', true)
      } catch (error) {
        if (error.response.status === 401) this.handleLogout()
        this.$swal({ icon: 'error', title: error.response.data.message })
      } finally {
        loader.hide()
      }
    },

    handleSearch(config) {
      const { endpoint, search } = config
      if (endpoint === 'movies') {
        this.getMovies(search)
      }

      if (endpoint === 'genres') {
        this.getGenres(search)
      }

      this.handleChangePage(endpoint)
    },
  },
  watch: {
    page(newPage, before) {
      this.load(newPage)

      if (before === 'add-movie') {
        this.movieToEdit = null
      }
    },
  },
}
</script>

<template>
  <MainLayout
    @changePage="handleChangePage($event, true)"
    @logout="handleLogout"
    @search="handleSearch"
    :user="user"
    :page="page"
  >
    <Dashboard v-if="page === 'dashboard'" :statistics="statistics" />
    <Logs v-if="page === 'logs'" :logs="logs" />
    <Movies
      v-if="page === 'movies'"
      @changePage="handleChangePage"
      @status="handleStatusChange"
      @edit="handleEdit"
      @search="handleSearch"
      :movies="movies"
      :user="user"
    />
    <Genres
      v-if="page === 'genres'"
      @changePage="handleChangePage"
      :genres="genres"
      @delete="handleDeleteGenre"
      @search="handleSearch"
    />
    <AddMovie
      v-if="page === 'add-movie'"
      :genres="genres"
      @addMovie="handleAddMovie"
      :movie="movieToEdit"
      @editMovie="handleEditMovie"
    />
    <AddGenre v-if="page === 'add-genre'" @addGenre="handleAddGenre" />
    <Login
      v-if="page === 'login'"
      @login="handleLogin"
      @register="handleRegister"
      @google="handleGoogleLogin"
    />
  </MainLayout>
</template>
