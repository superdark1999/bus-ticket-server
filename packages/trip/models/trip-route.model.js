import mongoose from "mongoose";
import paginate from "shared/lib/plugins/paginate.plugin";
import toJSON from "shared/lib/plugins/toJSON.plugin";
const { Schema } = mongoose;

const tripRoutesSchema = new Schema(
  {
    origin: String,
    destination: String,
    duration: Number,
    price: Number,
  },
  { timestamps: true }
);

tripRoutesSchema.plugin(toJSON);
tripRoutesSchema.plugin(paginate);

export const TripRoutes = mongoose.model("tripRoutes", tripRoutesSchema);
