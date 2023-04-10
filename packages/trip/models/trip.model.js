import mongoose from "mongoose";
import paginate from "shared/lib/plugins/paginate.plugin";
import toJSON from "shared/lib/plugins/toJSON.plugin";
const { Schema } = mongoose;

const tripSchema = new Schema(
  {
    origin: String,
    destination: String,
    duration: Number,
    price: Number,
  },
  { timestamps: true }
);

tripSchema.plugin(toJSON);
tripSchema.plugin(paginate);

export const Trip = mongoose.model("trips", tripSchema);
