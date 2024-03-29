export interface Position {
    latitude: number;
    longitude: number;
}

export interface PositionError {
    code: number;
    message: string;
}

export interface LocationInfo  {
    localName: string;
    lat: number;
    lng: number;
    image: string;
    description: string;
    creator: string;
    address: string;
    category: string;
}
export interface LocationInfoMarker  {
    localName: string;
    lat: number;
    lng: number;
    image: string;
    description: string;
    creator: string;
    address: string;
    category: string;
    _id: string;
}