import mongoose from "mongoose";
import paginate from "shared/lib/plugins/paginate.plugin";
import toJSON from "shared/lib/plugins/toJSON.plugin";
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
coachSchema.plugin(paginate);

export const Coach = mongoose.model("coaches", coachSchema);
