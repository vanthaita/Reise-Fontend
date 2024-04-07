export interface Position {
    latitude: number;
    longitude: number;
}

export interface PositionError {
    code: number;
    message: string;
}

export interface Location {
    locationId: string;
    localName: string;
    lat: number;
    lng: number;
    image: string;
    description: string;
    address: string;
    category: string;
    collectionName: string;
}
  export interface AccountData  {
    address: string;
    locationId: string[];
    receivedRewardsId: string[];
    point: number;
}

// export interface LocationInfoMarker  {
//     localName: string;
//     lat: number;
//     lng: number;
//     image: string;
//     description: string;
//     creator: string;
//     address: string;
//     category: string;
//     _id: string;
// }