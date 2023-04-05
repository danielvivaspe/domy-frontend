<template>
  <ul>
    <VerticalNavMenuRegularLink :route="routes.home" />
    <VerticalNavMenuRoomLink
      v-for="room in rooms"
      :key="room.id"
      :room="room"
    />
  </ul>
</template>

<script>
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
import { provide, ref } from '@vue/composition-api'
import homeService from '@/http/requests/home'
import VerticalNavMenuRoomLink from '../vertical-nav-menu-link/VerticalNavMenuRoomLink.vue'
import VerticalNavMenuRegularLink from '../vertical-nav-menu-link/VerticalNavMenuRegularLink.vue'

export default {
  components: {
    VerticalNavMenuRoomLink,
    VerticalNavMenuRegularLink,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      rooms: null,
      routes: {
        home: this.$router.resolve({
          name: 'app.home',
        }).route,
      },
    }
  },
  mounted() {
    this.$store.dispatch('home/initHome')
    homeService.rooms()
      .then(data => {
        this.rooms = data.data
      })
  },
  setup() {
    provide('openGroups', ref([]))

    return {
      resolveNavItemComponent,
    }
  },
}
</script>
