import mongoose from "mongoose";
import paginate from "shared/lib/plugins/paginate.plugin";
import toJSON from "shared/lib/plugins/toJSON.plugin";
const { Schema } = mongoose;

const ticketsSchema = new Schema(
  {
    seatNumber: Number,
    bookingDate: Date,
    status: String,
    tripRoute_id: String,
    user_id: String
  },
  { timestamps: true }
);

ticketsSchema.plugin(toJSON);
ticketsSchema.plugin(paginate);

export const tickets = mongoose.model("tickets", ticketsSchema);
