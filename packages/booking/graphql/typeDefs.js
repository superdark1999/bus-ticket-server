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
    user_id: String
  }

  # root type
  type Query {
    hellos: [hello]
    tickets(tripRoute_id: String, user_id: String): [ticket]
    ticket(_id: String): ticket
  }

  type Mutation {
    addTicket( seatNumber: Int!, tripRoute_id: String!, user_id: String!): ticket
    updateTicketStatus(_id: String,! status: String!): ticket
    removeTicket(_id: String!): ticket
  }
`;

export default typeDefs;
