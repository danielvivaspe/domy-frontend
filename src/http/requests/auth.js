import axios from '@/http'

export default {
  sanctum_token() {
    return axios.get('/sanctum/csrf-cookie')
  },
  login(email, password) {
    return axios.post('/login', {
      email,
      password,
    })
  },
  logout() {
    return axios.post('/logout')
  },
  get_user_data() {
    return axios.get('/api/user')
  },
}
