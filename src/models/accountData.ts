import mongoose, { Schema, Document } from "mongoose";

export interface AccountData extends Document {
    address: string;
    locationId: string[];
    point: number;
    receivedRewardsId: string[];
}

const accountDataSchema: Schema = new Schema({
    address: { type: String, required: true },
    locationId: [{ type: String, required: true }],
    point: { type: Number, required: true},
    receivedRewardsId: [{ type: String , required: true}]
});

const AccountData = mongoose.models.AccountData || mongoose.model<AccountData>("AccountData", accountDataSchema);

export default AccountData;
