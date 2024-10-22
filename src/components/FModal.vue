<template>



  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title v-if="!newBike">
        Vélo éléctrique<span style="font-size: 12px;">#{{ serial_number }}</span>

      </v-card-title>
      <v-card-title v-if="newBike">
        Nouveau vélo éléctrique
      </v-card-title>
      <v-card-subtitle v-if="!newBike">
        ID: {{ id }}
      </v-card-subtitle>
      <v-card-subtitle v-if="newBike && typeof newBikeLocation.address == 'string'">
        Adresse: {{ newBikeLocation.address }}
      </v-card-subtitle>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <div :class="{ 'error': error }" v-if="newBike && typeof newBikeLocation?.address == 'undefined'"
            id="geocoder">
            <div v-if="error" class="v-input__details" :style="'padding-left: 16px'">
              <div class="v-messages" role="alert" aria-live="polite" id="input-24-messages">
                <div class="v-messages__message">Requis.</div>
              </div>
            </div>
          </div>

          <v-text-field v-if="newBike" v-model="serial_number" label="Numéro de série" hide-details="auto" shaped
            class="mb-5" :rules="[rules.required, rules.min]"></v-text-field>
          <v-select v-model="service_status" :hint="service_status.status" :items="listStatus" item-title="status"
            item-value="value" label="Sélectionnez le statut du vélo" persistent-hint single-line
            :rules="[rules.required, rules.number]"></v-select>
          <div class="p-10">
            <h3 class="title">BATTERIE</h3>
            <div class="indicators">
              <div class="indicator modalIndicator" v-for="index of length" :class="getIndicatorColor(index)"
                :style="'height:' + `${(index + 1) * 4}px;`"></div>
            </div>
          </div>
          <v-slider hint="Niveau de la batterie" max="100" min="0" thumb-label="always" v-model="battery_level"
            :rules="[rules.number]"></v-slider>
          <v-switch v-model="in_order" inset label="Est arrangé" color="blue-grey darken-4" hide-details="auto"
            :rules="[rules.boolean]"></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="newBike" color="primary" text @click="post()">
            Ajouter
          </v-btn>
          <v-btn v-if="!newBike" color="primary" text @click="registerUpdate()">
            Modifier
          </v-btn>
          <v-btn v-if="!newBike" color="red" text @click="deleteBike()">
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-form>

    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { isProxy, toRaw } from 'vue';
import { LIST_STATUS } from '@/constants/list';
import { editBike, deleteBike, postBike } from '@/api';
import { getIndicatorColorFunction } from '@/utils/color'
import { initGeocoder } from '@/utils/map';
import { iterableArray } from '@/utils/iterable';
import getValue from '@/utils/proxy'

export default {
  props: {
    bike: {
      required: true,
    },
    newBikeLocation: {
      required: true,
      type: Object
    }
  },
  data() {
    let proxyBikeObject = this.bike
    let bike = getValue(proxyBikeObject)

    return {
      error: '',
      valid: true,
      dialog: false,
      length: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      serial_number: bike?.serial_number,
      id: bike?.id,
      in_order: bike?.in_order,
      service_status: bike?.service_status,
      battery_level: bike?.battery_level,
      listStatus: LIST_STATUS,
      openAlert: false,
      message: '',
      newBike: false,
      lngLat: null,
      rules: {
        required: (value: any) => !!value || 'Requis.',
        min: (value: any) => (value && value.length >= 3) || 'Minimum 3 caractères',
        number: (value: any) => !isNaN(value) || 'Ce champs doit être un nombre',
        boolean: (value: any) => typeof value == 'boolean' || 'Ce champs doit être un booléen',
      },
    }
  },

  watch: {
    'bike': function (newVal, oldVal) {
      if (isProxy(newVal)) {
        this.newBike = false
        let proxyBikeObject = this.bike
        let bike: any = null
        if (isProxy(proxyBikeObject)) {
          bike = toRaw(proxyBikeObject)
          this.in_order = bike?.in_order
          this.service_status = bike?.service_status
          this.battery_level = bike?.battery_level
          this.serial_number = bike?.serial_number
          this.id = bike?.id
          this.dialog = true
        }
      }
    },
    'newBikeLocation': function (newVal, oldVal) {
      if (isProxy(newVal)) {
        this.in_order = true
        this.service_status = 1
        this.battery_level = 100
        this.serial_number = ''
        this.id = ''
        this.newBike = true
        this.dialog = true
      }
    },
    'dialog': function (newVal, oldVal) {
      if (newVal) {
        if (this.newBike) {
          this.$nextTick(() => {
            const location = toRaw(this.newBikeLocation)
            if (typeof location.address != 'string') {
              this.error = ''
              const geocoder = window.MapboxGeocoder

              geocoder.addTo('#geocoder');
              geocoder.on('result', (e: any) => {
                this.lngLat = e.result.center
              });
              geocoder.on('clear', () => {
                this.lngLat = null
              });
            }
          })

        }
      } else {
        this.$emit('data-bike', null)
        this.newBike = false
      }
    },
  },
  methods: {
    initGeocod() {
      initGeocoder()
    },
    getIndicatorColor(index: number) {
      return getIndicatorColorFunction(index, this.battery_level)
    },
    async registerUpdate() {
      const validate = await this.$refs.form.validate()
      if (!validate.valid) {
        return
      }
      const { response: bike } = await editBike({
        id: this.id,
        in_order: this.in_order,
        battery_level: this.battery_level,
        service_status: this.service_status
      })
      if (Object.keys(bike).length == 0) {
        return
      }
      this.dialog = false
      this.$emit('for-update', {
        bike,
        type: 'edit'
      })
      this.showMessage('Le vélo a bien été modifié')
    },
    async deleteBike() {
      const { response: bike } = await deleteBike({
        id: this.id
      })
      if (Object.keys(bike).length == 0) {
        return
      }
      this.dialog = false
      this.$emit('for-update', {
        bike,
        type: 'remove'
      })
      this.showMessage('Le vélo a bien été supprimé')
    },
    showMessage(message: string) {
      this.$emit('alert', ...[
        message,
        'success'
      ])
    },
    async post() {
      this.error = ''
      const validate = await this.$refs.form.validate()
      if (this.newBike && typeof this.newBikeLocation.address == 'undefined' && !this.lngLat) {
        this.error = 'Requis'
        if (!validate.valid) {
          return
        }
        return
      }
      if (!validate.valid) {
        return
      }

      let location = this.lngLat ? iterableArray(this.lngLat).reverse() : [this.newBikeLocation.lat, this.newBikeLocation.lng]
      location = getValue([...location])

      const { response: bike } = await postBike({
        in_order: this.in_order,
        battery_level: this.battery_level,
        service_status: this.service_status,
        serial_number: this.serial_number,
        coordinates: location
      })

      if (Object.keys(bike).length == 0) {
        return
      }
      this.dialog = false
      this.$emit('for-update', {
        bike: {...bike, coordinates: [...location]},
        type: 'add'
      })
      this.showMessage('Le vélo a bien été crée')
    }
  }
}
</script>

<style>
.modalIndicator {
  width: 55px !important;
}

.mb-5 {
  margin-bottom: 5px;
}

.mapboxgl-ctrl-geocoder {
  min-width: 100%;
}

.mapboxgl-ctrl-geocoder--input {
  height: 50px;
  padding: 6px 35px;
}

.mapboxgl-ctrl-geocoder--icon-search {
  left: 7px;
  width: 25px;
  height: 25px;
  top: 12px;
}

#geocoder {
  margin-bottom: 20px;
}

.v-theme--dark .mapboxgl-ctrl-geocoder--input {
  background-color: #3b5064;
}

.v-theme--dark .mapboxgl-ctrl-geocoder--icon-search {
  fill: #a0abb5;
}

.v-theme--dark .mapboxgl-ctrl-geocoder--input,
.v-theme--dark .mapboxgl-ctrl-geocoder--input::placeholder {
  color: #a0abb5;
}

.v-theme--light .mapboxgl-ctrl-geocoder--input {
  background-color: #f6f6f6;
}

.error ::placeholder,
.error .v-messages__message {
  color: #B00020 !important;
}

.error .mapboxgl-ctrl-geocoder--icon-search {
  fill: #B00020;
}
</style>