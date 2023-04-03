import mongoose from "mongoose";
import paginate from "shared/lib/plugins/paginate.plugin";
import toJSON from "shared/lib/plugins/toJSON.plugin";
const { Schema } = mongoose;

const ticketSchema = new Schema(
  {
    seat_number: String,
    user_id: Number,
    trip_id: Number,
    booking_date: Date,
    status: String,
  },
  { timestamps: true }
);

ticketSchema.plugin(toJSON);
ticketSchema.plugin(paginate);

export const ticket = mongoose.model("ticket", ticketSchema);
