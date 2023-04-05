<template>

    <b-col
      md="3"
      lg="3"
    >
      <b-card
        :img-src="require('@/assets/images/services/sonos/beam.png')"
        img-alt="Card image cap"
        img-top
        title="Device name"
        class="device"
      >
        <b-card-text>
          <small class="text-muted text-danger">Not accessible</small>
        </b-card-text>
        <b-row>
          <b-col cols="1">
            <feather-icon :icon="'VolumeIcon'" />
          </b-col>
          <b-col cols="10">
            <vue-slider
              v-model="volume"
              :min="0"
              :max="100"
              direction="ltr"
              :interval="1"
              class="mb-2"
            />
          </b-col>
          <b-col cols="1">
            <feather-icon :icon="'Volume2Icon'" />
          </b-col>
        </b-row>

      </b-card>
    </b-col>

</template>

<script>
import VueSlider from 'vue-slider-component'
import {
  BCard, BCardText, BRow, BCol,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    BCard,
    BCardText,
    BRow,
    BCol,
    VueSlider,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      volume: 20,
    }
  },
}
</script>

<style scoped>
.device {
  background-color: #f5f5f5 !important;
}
</style>

