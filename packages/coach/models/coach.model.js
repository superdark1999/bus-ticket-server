import mongoose from "mongoose";
import toJSON from "shared/lib/plugins/toJSON.plugin";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const coachSchema = new Schema(
  {
    id: String,
    model: String,
    capacity: Number,
    registrationNumber: String,
  },
  { timestamps: true }
);

coachSchema.plugin(toJSON);
coachSchema.plugin(mongoosePaginate);

export const Coach = mongoose.model("coaches", coachSchema);
