import mongoose from "mongoose";
import paginate from "shared/lib/plugins/paginate.plugin";
import toJSON from "shared/lib/plugins/toJSON.plugin";
const { Schema } = mongoose;

const ticketsSchema = new Schema(
  {
    seatNumber: Number,
    tripRoute_id: String,
    bookingDate: Date,
    status: String,
    customerName: String,
    customerPhone: String,
    customerEmail: String,
  },
  { timestamps: true }
);

ticketsSchema.plugin(toJSON);
ticketsSchema.plugin(paginate);

export const tickets = mongoose.model("tickets", ticketsSchema);
