import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { iterableArray } from './iterable';
import geocodingApi from './geocoding';
import {to120} from '@/utils/percent'
import { MarkerPropsWithAdress } from '@/types';
declare global {
  interface Window {
    Mapbox: any;
    MapboxGeocoder: any;
  }
}

const mapCenter = { lat: 48.864716, lng: 2.349014 };

// génére une carte
export default (dark: any) => {
  const map = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string,
    container: 'map', 
    style: `mapbox://styles/mapbox/${dark ? 'dark' : 'streets'}-v11`,
    center: mapCenter, 
    zoom: 9
  });

  window.Mapbox = map

  return map
}

export const initGeocoder = () => {
  const geocoder = new MapboxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN  as string,
    mapboxgl: mapboxgl
  });

  window.MapboxGeocoder = geocoder
}

// génére un point sur une carte
export const generateMarker = (map: any, bike: any, coordinates: [number, number], battery: number) => {
  const el = document.createElement('div');
  el.id = bike.id
  const battery_level = to120(battery, 100) || 0
  if(battery_level >= 100){
    el.className = 'marker green';
  } else if(battery_level >= 70 && battery_level < 100){
    el.className = 'marker yellow';
  } else if(battery_level >= 40 && battery_level < 70){
    el.className = 'marker orange';
  }else if(battery_level < 40){
    el.className = 'marker red';
  }

  return new mapboxgl.Marker(el)
    .setLngLat([...coordinates] )
    .addTo(map)
  }

export const searchAddress = async (coords: any) => {
  try {
      const response = await geocodingApi(coords)
      const geocoding = await response.json()

      if(geocoding.features?.length > 0){
          const address = geocoding.features[0].place_name
          return {
              address: address as string,
              lat: coords.lat as number,
              lng: coords.lng as number
          } as MarkerPropsWithAdress
      }
      return {}
  } catch(e){
      console.error(e)
      return {}
  }

}