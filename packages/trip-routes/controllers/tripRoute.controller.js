import tripRouteService from "../services/tripRoute.service";

const createNewTripRoute = async (req, res) => {
  try{
    const {departureTime, arrivalTime, trip_id, coach_id, bookedSeat} = req.body;
    const newTripRoute = await tripRouteService.createNewTripRoute(departureTime, arrivalTime, trip_id, coach_id, bookedSeat);
    res.status(200).json({newTripRoute: newTripRoute});
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

const getTripRouteList = async (req, res) => {
  try{
    const tripRouteList = await tripRouteService.getTripRoutes();
    res.status(200).json({tripRouteList: tripRouteList})
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

const updateTripRoute = async (req, res) => {
  const trip = await tripRouteService.updateTripRoute(req.params.id, req.body);
  res.status(200).json(trip);
};

const deleteTripRoute = async (req, res) => {
  const trip = await tripRouteService.deleteTripRoute(req.params.id);
  res.status(200).json(trip);
};

const searchTripRoute = async (req, res) => {
  try{
    const {origin, destination, departureDate} = req.query;

    const tripRouteList = await tripRouteService.searchTripRoute(origin, destination, departureDate);

    res.status(200).json({tripRouteList: tripRouteList})
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

export const tripRoutesController = {
  createNewTripRoute: createNewTripRoute,
  getTripRouteList: getTripRouteList,
  updateTripRoute: updateTripRoute,
  deleteTripRoute: deleteTripRoute,
  searchTripRoute,
};
