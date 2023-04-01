import pick from "shared/lib/utils/pick";
import catchAsync from "shared/lib/utils/catchAsync";
import tripRouteService from "../services/trip-route.service";

const list = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["startDate"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const result = await tripRouteService.getTripRoutes(filter, options);
  return res.status(200).json({ data: result });
});

const getById = catchAsync(() => {});

const createTripRoute = catchAsync(async (req, res) => {
  const tripRoute = await tripRouteService.createTripRoute(req.body);

  res.status(200).json({
    success: "ok",
    data: tripRoute,
  });
});

const updateTripRoute = catchAsync(async (req, res) => {
  const tripRoute = await tripRouteService.updateTripRoute(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: "ok",
    data: tripRoute,
  });
});

const deletedTripRoute = catchAsync(async (req, res) => {
  const tripRoute = await tripRouteService.deleteTripRoute(req.params.id);

  res.status(200).json({
    success: "ok",
    data: tripRoute,
  });
});

export const tripRouteController = {
  list,
  getById,
  createTripRoute,
  updateTripRoute,
  deletedTripRoute,
};
