import mongoose from "mongoose";
import toJSON from "shared/lib/plugins/toJSON.plugin";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const tripRoutesSchema = new Schema(
  {
    departureTime: String,
    arrivalTime: String,
    
    bookedSeat: {
      type: [Boolean]
    },
    trip_id: String,
    coach_id: String,
  },
  { timestamps: true }
);

tripRoutesSchema.plugin(toJSON);
tripRoutesSchema.plugin(mongoosePaginate);

export const tripRoutes = mongoose.model("tripRoutes", tripRoutesSchema);
