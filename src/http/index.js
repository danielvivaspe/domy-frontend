// axios
import axios from 'axios'

const baseURL = process.env.VUE_APP_API_BASE_URL

const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
})

instance.interceptors.request.use(request => {
  console.debug('REQUEST INTERCEPTOR')
  console.log(request)
  return request
})

instance.interceptors.response.use(response => {
  console.debug('RESPONSE INTERCEPTOR')
  console.log(response)
  return response
}, error => {
  console.debug('RESPONSE INTERCEPTOR')
  console.error(error)
  if (error.response.status === 401) {
    console.error('Removing auth info...')
    const data = JSON.parse(localStorage.getItem('vuex'))
    data.auth.authenticated = false
    localStorage.setItem('vuex', data)
    location.reload()
  }
})

export default instance
