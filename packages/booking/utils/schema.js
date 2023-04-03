import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList } from "graphql";
import { getTripRouteByID, getTripRouteList, getTripRouteByStation } from "../services/trip_route.service";

const trip_route = new GraphQLObjectType({
  name: "trip_route",
  fields: () => ({
    _id: { type: GraphQLString },
    origin: { type: GraphQLString },
    destination: { type: GraphQLString },
    duration: { type: GraphQLFloat },
    price: { type: GraphQLInt },
  }),
});

const RootQuerytype = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    trip_route_list: {
      type: new GraphQLList(trip_route),
      resolve: async (root, args, context, info) => {
        const tripRouteList = await getTripRouteList();
        return tripRouteList;
      },
    },
    trip_route: {
        type: trip_route,
        args: { 
            _id: {type: GraphQLString},
        },
        resolve: async (root, args, context, info) => {
            const tripRoute = await getTripRouteByID(args._id);
            return tripRoute;
        }
    },
    trip_route_station: {
        type: new GraphQLList(trip_route),
        args: { 
            origin: {type: GraphQLString},
            destination: {type: GraphQLString},
        },
        resolve: async (root, args, context, info) => {
            const tripRouteList = await getTripRouteByStation(args.origin, args.destination);
            return tripRouteList;
        }
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuerytype,
});

export default schema;
