import axios from '@/http'

export default {
  rooms() {
    return axios.get('/api/rooms')
  },
  home_details() {
    return axios.get('/api/home')
  },
  get_room_devices(room) {
    return axios.get(`/api/room/${room}/devices`)
  },
}
