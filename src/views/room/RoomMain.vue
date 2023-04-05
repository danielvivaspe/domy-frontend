<template>
  <div>
    <b-row v-if="sensor != null">
      <b-col cols="4">
        <statistic-card-horizontal :statistic="temperature" icon="ThermometerIcon"/>
      </b-col>
      <b-col cols="4">
        <statistic-card-horizontal :statistic="luminosity" icon="SunIcon"/>
      </b-col>
      <b-col cols="4">
        <statistic-card-horizontal :statistic="presence" icon="UsersIcon"/>
      </b-col>
    </b-row>
    <b-card>
      <b-row>
        <!--<SonosDevice/>-->
        <PhilipsHueDevice
            v-for="device in devices"
            :device="device"
            :key="device.id"
            v-if="device.type !== 'sensor'"
        />
      </b-row>

    </b-card>
  </div>

</template>

<script>
import { BCard, BCol, BRow } from 'bootstrap-vue'
import SonosDevice from '@/views/room/device/SonosDevice.vue'
import PhilipsHueDevice from '@/views/room/device/PhilipsHueDevice.vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal'

export default {
  components: {
    PhilipsHueDevice,
    SonosDevice,
    BCard,
    BRow,
    BCol,
    StatisticCardHorizontal,
  },
  data() {
    return {
      room: null,
    }
  },
  computed: {
    devices() {
      return this.$store.state.home.devices[this.room]
    },
    sensor() {
      let sensor = null
      this.devices.forEach(element => {
        if (element.type === 'sensor') sensor = element
      })
      return sensor
    },
    temperature() {
      let temp = this.sensor.services.temperature.temperature.toFixed(1)
      temp = temp.toString().concat(' ºC')
      return temp
    },
    luminosity() {
      return this.sensor.services.light_level.light_level.toString().concat(' lumens')
    },
    presence() {
      return this.sensor.services.motion.motion_detected ? 'Presence detected' : 'No presence detected'
    },
  },
  created() {
    this.setRoom()
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.setRoom()
      },
    )
  },
  methods: {
    setRoom() {
      this.room = this.$router.currentRoute.params.room
    },
  },
}
</script>

<style>

</style>
