export interface Position {
    latitude: number;
    longitude: number;
}

export interface PositionError {
    code: number;
    message: string;
}

export interface ListLocation {
    id: string;
    localName: string;
    lat: number;
    lng: number;
    image: string;
    description: string;
    address: string;
    owner: string;
    pool: number;
    catetory: string;
  }
  