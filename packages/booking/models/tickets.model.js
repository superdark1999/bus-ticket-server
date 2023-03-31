import mongoose from "mongoose";
import paginate from "shared/lib/plugins/paginate.plugin";
import toJSON from "shared/lib/plugins/toJSON.plugin";
const { Schema } = mongoose;

const ticketsSchema = new Schema(
  {
    licensePlates: String,
  },
  { timestamps: true }
);

ticketsSchema.plugin(toJSON);
ticketsSchema.plugin(paginate);

export const Coach = mongoose.model("coaches", ticketsSchema);
