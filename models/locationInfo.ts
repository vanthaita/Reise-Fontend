import mongoose, { Schema, Document } from "mongoose";

export interface LocationInfo extends Document {
    localName: string;
    lat: number;
    lng: number;
    image: string;
    description: string;
    creator: string;
    address: string;
    category: string;
}

const locationSchema: Schema = new Schema({
    localName: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: String, required: true },
    address: { type: String, required: true },
    category: { type: String, required: true }
});

const LocationModel = mongoose.models.Location || mongoose.model<LocationInfo>("Location", locationSchema);

export default LocationModel;
