<template>
  <li
    class="nav-item"
    :class="{
      'active': active,
    }"
  >

    <b-link
      :to="route"
      class="d-flex align-items-center"
    >
      <feather-icon :icon="'CircleIcon'" />
      <span class="menu-title text-truncate">{{ room.name }}</span>
    </b-link>
  </li>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      roomName: null,
      active: false,
    }
  },
  computed: {
    route() {
      return this.$router.resolve({
        name: 'room',
        params: { room: this.room.name },
      }).href
    },
  },
  created() {
    this.roomName = this.$props.room.name
    this.active = this.$router.currentRoute.name === 'room' && this.$router.currentRoute.params.room === this.$props.room.name
    this.$watch(
      () => this.$route.params,
      toParams => {
        this.roomName = toParams.room
        this.active = this.$router.currentRoute.name === 'room' && this.$router.currentRoute.params.room === this.$props.room.name
      },
    )
  },

}
</script>
