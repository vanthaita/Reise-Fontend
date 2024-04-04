import mongoose, { Schema, Document } from "mongoose";

export interface AccountData extends Document {
    address: string;
    locationId: string[];
    point: number;
}

const accountDataSchema: Schema = new Schema({
    address: { type: String, required: true },
    locationId: [{ type: String, required: true }],
    point: { type: Number}
});

const AccountData = mongoose.models.Location || mongoose.model<AccountData>("Location", accountDataSchema);

export default AccountData;
