import tripRouteService from "../services/tripRoute.service";

const createNewTripRoute = async (req, res) => {
  try{
    const {departureTime, arrivalTime, trip_id, coach_id, capacity} = req.body;
    const newTripRoute = await tripRouteService.createNewTripRoute(departureTime, arrivalTime, trip_id, coach_id, capacity);
    res.status(200).json({newCoach: newTripRoute});
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

const getTripRouteList = async (req, res) => {
  try{
    const tripRouteList = await tripRouteService.getTripRoutes();
    res.status(200).json({coachList: tripRouteList})
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

export const tripRoutesController = {
  createNewTripRoute: createNewTripRoute,
  getTripRouteList: getTripRouteList,
};
