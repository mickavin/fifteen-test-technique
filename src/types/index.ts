import { LngLatLike } from 'mapbox-gl';

export interface MarkerProps {
    lng: number;
    lat: number;
}

export interface MarkerPropsWithAdress {
    lng?: number;
    lat?: number;
    address?: string
}

export interface IndexedMarkerProps {
    position: MarkerProps;
    index: number;
}


export interface FMapProps {
    center: LngLatLike;
}

export type Bike = {
    id: string,
    serial_number: string,
    coordinates: [number, number],
    in_order: boolean,
    service_status: number,
    battery_level: number,
}

export type ApiResult = {
    bikes: Array<Bike>;
    total: number;
}