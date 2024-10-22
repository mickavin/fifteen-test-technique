import { MarkerProps } from "@/types";

//Api convertisseur de coordonnées en adresse (Vérifier que l'option geocoding soit activé au moment de la génération de l'access token)
const geocoding = (coords: MarkerProps) =>  
fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.lng},${coords.lat}.json?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`, {
    method: 'GET',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    }
})

export default geocoding;