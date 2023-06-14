import { tickets } from "../models";
import axios from "axios";
import { GraphQLError } from "graphql";
import dotenv from "dotenv";
dotenv.config();

const ticketService = {
  // get ticket list
  getTicketList: async (tripRoute_id) => {
    const query = {};

    if (tripRoute_id) {
      query.tripRoute_id = tripRoute_id;
    }

    const ticketList = await tickets.find(query);
    console.log(ticketList);
    return ticketList;
  },

  // get a ticket by id
  getTicketById: async (_id) => {
    const ticket = await tickets.findById(_id);

    return ticket;
  },

  // creat new ticket
  addTicket: async (
    seatNumberList,
    tripRoute_id,
    customerName,
    customerPhone,
    customerEmail
  ) => {
    try {
      // check trip route
      const tripRoute = await axios
        .get(`${process.env.TRIP_ROUTE_SERVICE_URL}/trip-route/${tripRoute_id}`)
        .then((res) => res)
        .catch((res) => {
          return false;
        });

      if (!tripRoute) {
        return new GraphQLError("trip route id is not found");
      }

      // check seat in trip route
      const bookedSeat = tripRoute.data.tripRoute.bookedSeat;
      for (const seatNumber of seatNumberList) {
        if (bookedSeat[seatNumber]) {
          return new GraphQLError(
            JSON.stringify({
              message: "seat number is already booked",
              seatNumber,
            })
          );
        }
      }

      // update seat on trip route
      const newBookedSeat = [...bookedSeat];
      for (const seatNumber of seatNumberList) {
        newBookedSeat[seatNumber] = true;
      }
      const data = {
        id: tripRoute_id,
        bookedSeat: newBookedSeat,
      };

      await axios.put(
        `${process.env.TRIP_ROUTE_SERVICE_URL}/${tripRoute_id}`,
        data
      );

      // add ticket to db
      const ticketList = [];
      for (const seatNumber of seatNumberList) {
        const ticket = new tickets({
          seatNumber,
          bookingDate: Date.now(),
          status: "Còn hạn",
          tripRoute_id,
          customerName,
          customerPhone,
          customerEmail,
        });

        const newTicket = await ticket.save();
        ticketList.push(newTicket);
      }

      // const result = {
      //     id: newTicket.id,
      //     seatNumber: newTicket.seatNumber,
      //     bookingDate: newTicket.bookingDate,
      //     status : newTicket.status,
      //     customerName: newTicket.customerName,
      //     customerPhone: newTicket.customerPhone,
      //     customerEmail: newTicket.customerEmail,
      //     tripRoute_id: newTicket.tripRoute_id,
      //     departureTime: tripRoute.data.tripRoute.departureTime,
      //     arrivalTime: tripRoute.data.tripRoute.arrivalTime,
      //     trip_id: tripRoute.data.tripRoute.trip_id,
      //     origin: tripRoute.data.tripRoute.origin,
      //     destination: tripRoute.data.tripRoute.destination,
      //     duration: tripRoute.data.tripRoute.duration,
      //     price: tripRoute.data.tripRoute.price,
      //     coach_id: tripRoute.data.tripRoute.coach_id,
      //     model: tripRoute.data.tripRoute.model,
      //     capacity: tripRoute.data.tripRoute.capcity,
      //     registrationNumber: tripRoute.data.tripRoute.registrationNumber,
      // }

      console.log(
        "🚀 ~ file: ticket.service.js ~ line 121 ~ ticketList",
        ticketList
      );
      return ticketList;
    } catch (error) {
      console.log(error);
      return new GraphQLError("server error");
    }
  },

  // update ticket status
  updateTicketStatus: async (_id, status) => {
    // get ticket from collection
    const ticket = await tickets.findById(_id);

    // update and save
    ticket.status = status;
    await ticket.save();

    return ticket;
  },

  // remove ticket by id
  removeTicket: async (_id) => {
    const ticketWasRemoved = await tickets.findByIdAndDelete(_id);
    return ticketWasRemoved;
  },
};

export default ticketService;
