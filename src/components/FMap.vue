<template>
  <div id="map" style="height: 100vh"></div>
</template>

<script lang="ts">
import generateMap, {generateMarker, searchAddress, initGeocoder} from "@/utils/map";
import { MarkerPropsWithAdress } from "@/types";
import { iterableArray } from "@/utils/iterable";
export default {
  props: {
    data: {
    required: true,
    type: Array
  }
  },
  data() {
    return {
      forEdit: false,
      markers: [] as any
    }
  },
  mounted(){
    this.init()
  },
    beforeUnmount() {
        const markersBefore = this.markers
        markersBefore.map((item: any, index: number) => {
              item.remove()
              const bike = markersBefore.find((it: any) => it?.id === item?.id)
              item.getElement().removeEventListener('click', () => {
                this.$emit('data-marker', {position: item.getLngLat(), index})
              })
              item.getElement().removeEventListener('dblclick', () => {
                this.$emit('data-bike', bike)
              })
            }
          )
    },
    methods: {
      newBike(location: MarkerPropsWithAdress | Object){
        setTimeout(() => {
          if(!this.forEdit){
            this.$emit('new-bike', location)
          }
        }, 400)
      },
      init(){
        initGeocoder()
        const map = generateMap(this.$vuetify.theme.current.dark)
        map.resize();
        map.on('click', async (e: any) => {
          const location: MarkerPropsWithAdress = await searchAddress(e.lngLat)
          if(typeof location?.lat == 'number' && typeof location?.lng == 'number'){
            this.newBike(location)
          }
        });
        this.markers = this.data.map((bike: any) => generateMarker(map, bike, iterableArray(bike?.coordinates).reverse() as [number, number], bike?.battery_level))
        this.markers.map((item: any, index: number) => {
              const el = item?.getElement()
              const bike = this.data.find((it: any) => it?.id === el?.id)
              el.addEventListener('click', () => {
                this.forEdit = true
                this.$emit('data-marker', {position: item.getLngLat(), index})
                setTimeout(() => {
                  this.forEdit = false
                }, 800)
              })
              el.addEventListener('dblclick', () => {
                this.$emit('data-bike', bike)
              })
            }
          )
      }
    },
    watch: {
      'data': function(newVal, oldVal){
        const markersBefore = this.markers
        markersBefore.map((item: any, index: number) => {
              item.remove()
              const bike = markersBefore.find((it: any) => it?.id === item?.id)
              item.getElement().removeEventListener('click', () => {
                this.$emit('data-marker', {position: item.getLngLat(), index})
              })
              item.getElement().removeEventListener('dblclick', () => {
                this.$emit('data-bike', bike)
              })
            }
          )

        const map = window.Mapbox
        map.on('click', async (e: any) => {
          const location: MarkerPropsWithAdress = await searchAddress(e.lngLat)
          if(typeof location?.lat == 'number' && typeof location?.lng == 'number'){
            this.newBike(location)
          }
        });
        const markers = newVal.map((bike: any) => generateMarker(map, bike, iterableArray(bike?.coordinates).reverse() as [number, number], bike?.battery_level))
        markers.map((item: any, index: number) => {
          const el = item?.getElement()
          const bike = this.data.find((it: any) => it?.id === el?.id)
            el.addEventListener('click', () => {
              this.forEdit = true
              this.$emit('data-marker', {position: item.getLngLat(), index})
              setTimeout(() => {
                this.forEdit = false
              }, 800)              
            })
            el.addEventListener('dblclick', () => {
              this.$emit('data-bike', bike)
            })
          }
              
        )
        this.markers = markers
        
      }
    }
}

</script>
<style>
.marker {
  background-image: url('../assets/bike.png');
  background-size: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  padding: 10px;
  background-size: 70%;  
  background-repeat: no-repeat;
  background-position: center;
}
.green {
  background-color: #2ecc71;
}

.yellow {
  background-color: #f1c40f;
}

.orange {
  background-color: #e67e22;
}

.red {
  background-color: #e74c3c;
}
</style>