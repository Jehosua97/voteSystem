import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:3000/user')
        this.user = response.data
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:3000/login', credentials)
        if (response.data.success) {
          this.user = response.data.user
          return true
        } else {
          alert('Incorrect username or password!')
          return false
        }
      } catch (error) {
        console.error('Error during login:', error)
        return false
      }
    }
  }
})