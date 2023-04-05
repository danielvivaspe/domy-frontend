import home from '@/http/requests/home'

export default {
  namespaced: true,
  state: {
    devices: {},
  },
  getters: {},
  mutations: {
    SET_ROOM_DEVICES(state, devices) {
      state.devices[devices.room] = devices.devices
    },
  },
  actions: {
    initRoom({ commit }, room) {
      return home.get_room_devices(room)
        .then(({ data }) => {
          commit('SET_ROOM_DEVICES', {
            room,
            devices: data,
          })
        })
    },
    initHome(context) {
      home.rooms()
        .then(data => {
          //this.rooms = data.data
          data.data.forEach(room => {
            context.dispatch('initRoom', room.name)
            //this.initRoom(room.name)
          })
        })
    },
  },
}
