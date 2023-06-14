import gql from "graphql-tag";

const typeDefs = gql`
  # basic type to test
  type hello {
    name: String
    value: String
  }

  # ticket type
  type ticket {
    _id: String
    seatNumber: Int
    bookingDate: String
    status: String
    tripRoute_id: String
    customerName: String
    customerPhone: String
    customerEmail: String
  }

  # root type
  type Query {
    hellos: [hello]
    tickets(tripRoute_id: String, customerPhone: String, customerEmail:String): [ticket]
    ticket(_id: String): ticket
  }

  type Mutation {
    addTicket(seatNumberList: [Int!]!, tripRoute_id: String!, customerName: String!, customerPhone: String!, customerEmail: String): [ticket]
    updateTicketStatus(_id: String!, status: String!): ticket
    removeTicket(_id: String!): ticket
  }
`;

export default typeDefs;
