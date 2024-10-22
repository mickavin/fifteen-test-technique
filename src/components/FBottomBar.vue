<script lang="ts">
import FCard from '@/components/FCard.vue'
import { Bike } from '@/types'
import { iterableArray } from '@/utils/iterable'

export default {
  components: {
    FCard
  },
  props: {
    data: {
    required: true,
    type: Array
  },
  marker: {
    required: true
  }
  },
  methods: {
    calculateActiveIndex() {
      let activeIndex = 0
      let items = document.querySelectorAll('.item')
      let distances = Array.from(items).map(item => {
          let rect = item.getBoundingClientRect()
          return {
              index: item.dataset.index,
              distance: Math.abs((rect.left))
          }
      })
      distances.sort((a, b) => a.distance - b.distance)
      activeIndex = distances[0].index
      return activeIndex
  },
  scrollTo(offset: number, callback: any) {
    let container = document.querySelector('.container')
    const fixedOffset = offset.toFixed();
    const onScroll =  () => {
            if (container?.scrollLeft?.toFixed() === fixedOffset) {
              container?.removeEventListener('scroll', onScroll)
                callback()
            }
        }

    container?.addEventListener('scroll', onScroll)
    container?.scrollTo({
        left: offset,
        behavior: 'smooth'
    })
  },
  calculateScroll(index: number) {
      this.disabled = true
      this.activeIndex = index
      let items = document.querySelectorAll('.item')
      const item = items[index]
      const position = item.offsetLeft
      this.scrollTo(position, () => {
        this.disabled = false
      })
      const activeIndex = typeof this.activeIndex == 'string' ? parseInt(this.activeIndex) : this.activeIndex
      const data : any = this.data
      const center = iterableArray(data[activeIndex].coordinates).reverse()
      window.Mapbox.flyTo({
          center,
          zoom: 12
        })
    },
    onScroll() {
      if(this.disabled === false){
        if(this.activeIndex != this.calculateActiveIndex()){
          let audio = document.createElement('audio')
          audio.src = '../assets/wheel.mp3'
          audio.play()
        }
        const data : any = this.data
        this.activeIndex = this.calculateActiveIndex()
        const activeIndex = typeof this.activeIndex == 'string' ? parseInt(this.activeIndex) : this.activeIndex
        const center = iterableArray(data[activeIndex].coordinates).reverse()
        window.Mapbox.flyTo({
          center,
          zoom: 12
        })
      }
      
    },
    getBike(val: any){
      this.bike = val
    }
  },
  mounted(){
    const data : any = this.data
    const activeIndex = typeof this.activeIndex == 'string' ? parseInt(this.activeIndex) : this.activeIndex
    let items = document.querySelectorAll('.item')
    const item = items?.[activeIndex]
    if(item){
      const position = item.offsetLeft
      this.scrollTo(position, () => {
        this.disabled = false
      })
      const center = iterableArray(data[activeIndex].coordinates).reverse()
      window.Mapbox.flyTo({
        center,
        zoom: 12
      })
    }
   
  },
  data: () => ({
    activeIndex: 0,
    disabled: false,
    bike: null as (Bike | null)
  }),
  watch: {
    'marker': function(newVal, oldVal) {
      this.calculateScroll(newVal.index)
    },
    'bike': function(newVal, oldVal) {
      this.$emit('data-bike', newVal)
    }
  }
  
}


</script>
<template>
  <div>
    <div class="bottombar">
      <div class="container" v-on:scroll="onScroll">
        <FCard class="item" @data-bike="getBike" v-for="(item, index) in data" v-bind:key="index" v-bind:class="{ active: `${index}` === `${activeIndex}` }" v-bind:data-index="index" v-bind="item"/> 
      </div>
    </div>
  </div>
</template>


<style scoped>

.container {
  width: 100%;
  display: flex;
  place-items: center;
  overflow-x: scroll;
  white-space: nowrap;
  padding-left: 400px;
  padding-right: 100vw;
}

.active {
  transform: scale(0.9) !important;
  transition: 0.5s;
}

.item {
  transform: scale(0.7);
  transition: 0.5s;

}

@media screen and (max-width: 420px) {
  .item.active {
    transform: scale(0.8) !important;
  }
  .item {
    transform: scale(0.6)  !important;
  }
}

@media screen and (max-height: 420px) {
  .item.active {
    transform: scale(0.8) !important;
  }
  .item {
    transform: scale(0.6)  !important;
  }
}

.bottombar {
    height: 350px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    transition: all 0.3s ease-out;
    background-color: transparent;
}



</style>
