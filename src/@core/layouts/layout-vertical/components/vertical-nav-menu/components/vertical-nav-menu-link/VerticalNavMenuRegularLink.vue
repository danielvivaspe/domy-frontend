<template>
  <li
    class="nav-item"
    :class="{
      'active': active,
    }"
  >

    <b-link
      :to="route.path"
      class="d-flex align-items-center"
    >
      <feather-icon :icon="'CircleIcon'" />
      <span class="menu-title text-truncate">{{ route.meta.pageTitle }}</span>
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
    route: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    }
  },
  created() {
    console.log(this.$props.route)
    this.active = this.$router.currentRoute.name === this.$props.route.name
    this.$watch(
      () => this.$route.params,
      () => {
        this.active = this.$router.currentRoute.name === this.$props.route.name
      },
    )
  },

}
</script>
