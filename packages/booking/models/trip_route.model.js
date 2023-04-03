import mongoose from "mongoose";
import paginate from "shared/lib/plugins/paginate.plugin";
import toJSON from "shared/lib/plugins/toJSON.plugin";
const { Schema } = mongoose;

const tripRouteSchema = new Schema(
  {
    origin: String,
    destination: String,
    duration: Number,
    price: Number,
  },
  { timestamps: true }
);

tripRouteSchema.plugin(toJSON);
tripRouteSchema.plugin(paginate);

export const trip_route = mongoose.model("trip_route", tripRouteSchema);
