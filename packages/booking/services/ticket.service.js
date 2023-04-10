import { tickets } from "../models";

const ticketService = {
    // get ticket list
    getTicketList: async (tripRoute_id, user_id) => {
        const query = {};

        if (tripRoute_id) {
          query.tripRoute_id = tripRoute_id;
        }
      
        if (user_id) {
          query.user_id = user_id;
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
    addTicket: async (seatNumber, tripRoute_id, user_id) => {
        const bookingDate = Date.now();
        const status = "Còn hạn";

        const ticket = new tickets({
            seatNumber,
            bookingDate,
            status,
            tripRoute_id,
            user_id
        });

        const newTicket = await ticket.save();
        return newTicket;
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
    }
}

export default ticketService;