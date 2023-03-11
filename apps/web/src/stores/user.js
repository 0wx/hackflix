import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'
import { api } from '../helpers/axios'

export const useUserStore = defineStore('user', {
  state: () => {
    return { id: 0, email: '' }
  },
  actions: {
    checkAccessToken() {
      try {
        const { id, email } = jwtDecode(localStorage.access_token)
        this.id = id
        this.email = email
      } catch (error) {
        if (this.email) {
          this.logout(true)
          return
        }

        localStorage.removeItem('access_token')
      }
    },

    async login(payload, endpoint = 'login', to = '/') {
      try {
        const { data } = await api.post(`/pub/${endpoint}`, payload)
        const { access_token } = data
        localStorage.setItem('access_token', access_token)

        this.checkAccessToken()
        this.$router.push(to)
      } catch (error) {
        this.$notify(
          {
            group: 'error',
            title: 'Error',
            text: error.response.data.message,
          },
          2000
        )
      }
    },

    register(payload) {
      this.login(payload, 'register')
    },

    logout(reload) {
      localStorage.removeItem('access_token')
      this.id = 0
      this.email = ''
      if (this.$router.currentRoute._value.path === '/favorited') {
        this.$router.push('/login?to=/favorited')
        return
      }

      if (reload) {
        const current = this.$router.currentRoute._value.path
        this.$router.push('/')
        this.$router.push(current)
        return
      }
    },

    async loginGoogle({ credential }) {
      try {
        const { data } = await api.post('/pub/google-sign-in', null, {
          headers: {
            'google-auth-token': credential,
          },
        })

        const { access_token } = data
        localStorage.setItem('access_token', access_token)
        this.checkAccessToken()

        this.$router.push(this.$router.currentRoute._value.query.to || '/')
      } catch (error) {
        this.$notify({
          group: 'error',
          title: 'Error',
          text: error.response.data.message,
        })
      }
    },
  },
})
