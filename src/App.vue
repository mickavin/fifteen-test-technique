<template>
  <FLoader v-if="!isLoaded"/>
  <main v-if="isLoaded">
    <FAddBikeButton
      @new-bike="newBike"/>
    <FDarkModeButton/>
    <FInput 
      @search-data="searchData"/>
    <FModal 
      :bike="bike"
      @for-update="update"
      :newBikeLocation="newBikeLocation"
      @alert="openAlert"
      @data-bike="setBike"
      @new-bike="newBike"/>
    <FMap 
      v-if="isLoaded" 
      :data="data" 
      @data-marker="setMarker"
      @data-bike="setBike"
      @new-bike="newBike"/>
    <FBottomBar 
      v-if="isLoaded" 
      :data="data" 
      :errorBike="errorBike" 
      :marker="marker"
      @data-bike="setBike"/>
      <Transition name="slide-fade">
      <div v-if="message" class="absolute-message">
          <v-alert
            :type="type"
            >
            {{message}}
            </v-alert>
    </div>
  </Transition>
  </main>
</template>

<script setup lang="ts">
import FAddBikeButton from "@/components/FAddBikeButton.vue";
import FMap from "@/components/FMap.vue";
import FBottomBar from "@/components/FBottomBar.vue";
import FModal from "@/components/FModal.vue";
import FInput from "@/components/FInput.vue";
import FLoader from "./components/FLoader.vue";
import FDarkModeButton from "@/components/FDarkModeButton.vue";
import {getBikes} from '@/api';
import { onBeforeMount, ref, Transition } from "vue";
import { iterableArray } from "@/utils/iterable";
import { IndexedMarkerProps, Bike, MarkerPropsWithAdress } from "@/types";
import search from "@/utils/search";
import getValue from '@/utils/proxy'

const data = ref<any>([])
const registeredData = ref<any>([])
const errorBike = ref<any>(null)
const message = ref<string>('')
const type = ref<"error" | "success" | "warning" | "info" | undefined>(undefined)
const isLoaded = ref<boolean>(false)
const marker = ref<IndexedMarkerProps | null>(null)
const bike = ref<Bike | null>(null)
const searchText = ref<string>('')
const newBikeLocation = ref<MarkerPropsWithAdress | Object>({})

function setMarker(val: IndexedMarkerProps){
  marker.value = val
}
function setBike(val: Bike | null){
  bike.value = val
}

function update(response: any){
  if(response.type == 'add'){
    let raw = [...iterableArray(getValue(registeredData.value))]
    raw.push(response.bike)
    registeredData.value = raw
    const text = getValue(searchText.value)
    if(text){
      data.value = search(text, raw, [{key: 'id', type: 'string'}, {key: 'serial_number', type: 'string'}])
    } else {
      data.value = raw
    }
  } else if(response.type == 'remove'){
    let raw = [...iterableArray(getValue(registeredData.value))].filter((it: any) => it?.id != response.bike.id)
    registeredData.value = raw
    const text = getValue(searchText.value)
    if(text){
      data.value = search(text, raw, [{key: 'id', type: 'string'}, {key: 'serial_number', type: 'string'}])
    } else {
      data.value = raw
    }
  } else if(response.type == 'edit'){
    let raw = [...iterableArray(getValue(registeredData.value))]
    const item = response.bike
    const index = raw.findIndex((it: any) => it?.id == item.id)
    if(index > -1){
      raw.splice(index, 1, item)
      registeredData.value = raw
      const text = getValue(searchText.value)
      if(text){
        data.value = search(text, raw, [{key: 'id', type: 'string'}, {key: 'serial_number', type: 'string'}])
      } else {
        data.value = raw
      }
    }
  }
}

function newBike(location: MarkerPropsWithAdress | Object ){
  newBikeLocation.value = location
}

function searchData(text: string){
  searchText.value = text
  if(text){
    let raw = getValue(registeredData.value)
    data.value = search(text, raw, [{key: 'id', type: 'string'}, {key: 'serial_number', type: 'string'}])
  } else {
    data.value = registeredData.value
  }
 
}

function openAlert(alertMessage: string, alertType: "error" | "success" | "warning" | "info" | undefined){
  setTimeout(() => {
      message.value = alertMessage
      type.value = alertType
      setTimeout(() => {
        message.value = ''
        type.value = undefined
      }, 4000)
  }, 1000)
}

async function init(){
  const {
    response,
    error,
    isLoad
  } = await getBikes()
  const iterableBikes = [...iterableArray(response)]
  data.value = iterableBikes
  registeredData.value = iterableBikes
  isLoaded.value = isLoad
  if(error){
    openAlert('Une erreur est survenue. Veuillez réessayer.', 'error')
  }
}

onBeforeMount(() => {
 init()
})

</script>
<style>
.absolute-message {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 999;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>