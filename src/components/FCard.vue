<template>
    <div class="card-wrapper">
        <div class="card">
        <div class="card-top" :class="getBatteryColor()">
            <div class="card-top-text">
            <h3>Vélo éléctrique</h3><span>#{{ serial_number }}</span>
           
            </div>
            <img src="../assets/bike2.png" class="bike" />
        </div>
        <div class="card-bottom" :style="'background-color:'+$vuetify.theme.current.colors.background">
            <a
            href="#"
            class="absolute-btn" 
            :style="'text-decoration: none; color:'+$vuetify.theme.current.colors.primary"
            v-on:click="emitBike()"           
            >
            <strong :style="'padding: 2px;padding-right: 5px;'">
                Modifier
            </strong>
            <v-icon 
            :color="$vuetify.theme.current.colors.primary"
            icon="fas fa-edit" />
            </a>
            
            <span class="badge" :class="getOrderStatus()">
                {{in_order ? 'Arrangé' : 'Non arrangé'}} 
            </span>
            <span :class="getStatus()">
                {{service_status === 1 ? 'Libre' : service_status === 2 ? 'Réservé' : "En cours d'utilisation"}} 
            </span>
            <div v-if="battery_level < 10" class="p-20">
                <span class="badge red">Plus de batterie</span> 
            </div>
            <div v-if="battery_level >= 10" class="p-20">
                <h3 class="title">BATTERIE</h3>
                <div class="indicators">
                    <div class="indicator" v-for="index of length" :class="getIndicatorColor(index)" :style="'height:'+`${(index+1)*4}px;`"></div>  
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { to120 } from '@/utils/percent'
import FModal from './FModal.vue'
import {getIndicatorColorFunction} from '@/utils/color'
export default {
    data(){
        return {
        length: [0,1,2,3,4,5,6,7,8,9,10,11]
        }
    },
    components: {
        FModal
    },
   props: {
    serial_number: {
            required: true,
            type: String,
        },
        coordinates: {
            required: true,
            type: Array<Number>
        },
        in_order: {
            required: true,
            type: Boolean
        },
        service_status: {
            required: true,
            type: Number
        },
        battery_level: {
            required: true,
            type: Number
        },
        id: {
            required: true,
            type: String
        }
   } ,
   methods: {
    getStatus(){
      return this.service_status === 1 ? 'badge free' : this.service_status === 2 ? 'badge booked' : 'badge in_use'
    },
    getOrderStatus(){
        return this.in_order ? 'ordered' : 'unordered'
    },
    getBatteryColor(){
        const battery_level = to120(this.battery_level, 100)
        if(battery_level >= 100){
            return 'green'
        } else if(battery_level >= 70 && battery_level < 100){
            return 'yellow'
        } else if(battery_level >= 40 && battery_level < 70){
            return 'orange'
        } else if(battery_level < 40){
            return 'red'
        }
    },
    getIndicatorColor(index: number){
        return getIndicatorColorFunction(index, this.battery_level)
    },
    emitBike(){
        this.$emit('data-bike', {
            id: this.id,
            serial_number: this.serial_number,
            battery_level: this.battery_level,
            service_status: this.service_status,
            in_order: this.in_order,
            coordinates: this.coordinates
        })
    }
   }
}
</script>
<style>
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Quicksand, sans-serif;
}

html {
  font-size: 62.5%;
}


.p-20{
    padding: 20px;
    padding-left: 0px;
}

.p-10{
    padding: 10px;
    padding-left: 0px;
}


.indicators {
    flex-direction: row;
    display: flex;
    align-items: flex-end;
}

.indicator {
    margin: 2px; 
    width: 30px;
}

.absolute-btn {
    position: absolute;
    top:10px;
    right: 10px;
    display: flex;
}

.title {
    color: #aaa;
    margin-bottom: 0px !important;
    font-size: 14px;
}


.card {
width: 25rem;
height: 20rem;
background: #eee;
border-radius: 2.5rem;
box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.7);
position: relative;
overflow: hidden;
}

.badge {
    padding: 10px;
    border-radius: 100px;
    margin-right: 5px;
    color: #fff;
}

.grey {
    background-color: #ccc;
}

.ordered {
    background-color: #27ae60;

}

.unordered {
    background-color: #c0392b;
}

.in_use {
    background-color: #3498db;
}

.booked {
    background-color: #1abc9c;
}

.free {
    background-color: #34495e;
}

.battery-green{
    background-color: #27ae60;
}
.battery-yellow{
    background-color: #f39c12;
}
.battery-orange{
    background-color: #d35400;
}
.battery-red{
    background-color: #c0392b;
}

.card-top {
  width: 100%;
  height: 50%;
  padding: 3rem;
  border-radius: 2.5rem 2.5rem 0 0;
  transition: background 5s;
}

.logo {
  width: 8rem;
  margin-bottom: 2rem;
}

.card-top-text {
  color: #fff;
}

.card-top-text h1 {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin-bottom: 1rem;
}

.bike {
  width: 15rem;
  position: absolute;
  top: 10px;
  right: 0px;
}

/* .container.change .bike {
  transform: translateX(-50rem) rotateZ(45deg);
} */

.bike-2 {
  width: 11rem;
  position: absolute;
  top: -10rem;
  right: -45rem;
  transition: transform 1s;
}

.container.change .bike-2 {
  transform: translateX(-40rem) rotateZ(-45deg);
}

.card-bottom {
  width: 100%;
  height: 50%;
  padding: 2rem 3rem;
  position: relative;
}

.card-bottom h1 {
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: #333;
}



.card-bottom h3 {
font-size: 1rem;
font-weight: 400;
text-transform: uppercase;
margin-bottom: 0.6rem;
}




</style>