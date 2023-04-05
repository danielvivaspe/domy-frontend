<template>

  <b-col
    md="3"
    lg="3"
  >
    <b-card
      :img-src="require(`@/assets/images/services/philipshue/${device.type}.png`)"
      img-alt="Card image cap"
      img-top
      :title="device.name"
      class="device"
    >
      <b-card-text>
        <small class="text-muted text-danger">Not accessible</small>
      </b-card-text>
      <b-row v-if="['spot_bulb', 'candle_bulb'].includes(device.type)">
        <b-col cols="1">
          <feather-icon :icon="'MoonIcon'" />
        </b-col>
        <b-col cols="10">
          <vue-slider
            v-model="intensity"
            :min="0"
            :max="100"
            direction="ltr"
            :interval="1"
            class="mb-2"
          />
        </b-col>
        <b-col cols="1">
          <feather-icon :icon="'SunIcon'" />
        </b-col>
      </b-row>
      <b-row v-if="['plug'].includes(device.type)">
        <b-col cols="12" class="text-center">
          <b-form-checkbox
              :checked="device.services.light.on"
              class="custom-control-primary"
              name="check-button"
              switch
              size="50"
          >
        <span class="switch-icon-left">
          <feather-icon icon="CircleIcon" />
        </span>
            <span class="switch-icon-right">
          <feather-icon icon="XCircleIcon" />
        </span>
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row v-if="['spot_bulb', 'candle_bulb'].includes(device.type)">
        <b-col cols="12">
          <b-button
              block
              v-b-modal.modal-1
              variant="primary"
          >
            Change color
          </b-button>
        </b-col>
      </b-row>

    </b-card>
  </b-col>

</template>

<script>
import VueSlider from 'vue-slider-component'
import {
  BCard, BCardText, BRow, BCol, BButton, BFormCheckbox,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    BCard,
    BCardText,
    BRow,
    BCol,
    BButton,
    BFormCheckbox,
    VueSlider,
  },
  directives: {
    Ripple,
  },
  props: {
    device: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      intensity: 0,
      color: {
        red: 200,
        green: 200,
        blue: 200,
      },
    }
  },
  created() {
    if (typeof this.device.services.light !== 'undefined') {
      const intensity = this.device.services.light.on ? this.device.services.light.brightness : 0
      this.intensity = Math.round(intensity)
    }
  },
}
</script>

<style scoped>
.device {
  background-color: #f5f5f5 !important;
}
</style>
