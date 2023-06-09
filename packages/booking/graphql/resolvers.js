import ticketService from "../services/ticket.service";

// mock data
const hellos = [
    {
        name: "c#",
        value: `Console.WriteLine("hello world")`
    },
    {
        name: "js",
        value: `console.log("hello world")`
    }
]

const resolvers = {
    Query: {
        hellos: () => hellos,
        tickets: async (parent, args, contextValue, info) => {
            return await ticketService.getTicketList(args.tripRoute_id, args.customerPhone, args.customerEmail);
        }, 
        ticket: async (parent, args, contextValue, info)  => {
            return await ticketService.getTicketById(args._id);
        }
    },
    Mutation: {
        addTicket: async (parent, args, contextValue, info) => {
            return await ticketService.addTicket(args.seatNumberList, args.tripRoute_id, args.customerName, args.customerPhone, args.customerEmail);
        },
        updateTicketStatus: async (parent, args, contextValue, info) => {
            return await ticketService.updateTicketStatus(args._id, args.status);
        },
        removeTicket: async (parent, args, contextValue, info) => {
            return await ticketService.removeTicket(args._id);
        }

    }
}

export default resolvers;