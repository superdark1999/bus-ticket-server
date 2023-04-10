import pick from "shared/lib/utils/pick";
import catchAsync from "shared/lib/utils/catchAsync";
import tripService from "../services/trip.service";

const list = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["startDate"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const result = await tripService.getTrip(filter, options);
  return res.status(200).json({ data: result });
});

const getById = catchAsync(() => {});

const createTrip = catchAsync(async (req, res) => {
  const trip = await tripService.createTrip(req.body);

  res.status(200).json({
    success: "ok",
    data: trip,
  });
});

const updateTrip = catchAsync(async (req, res) => {
  const trip = await tripService.updateTrip(req.params.id, req.body);

  res.status(200).json({
    success: "ok",
    data: trip,
  });
});

const deletedTrip = catchAsync(async (req, res) => {
  const trip = await tripService.deleteTrip(req.params.id);

  res.status(200).json({
    success: "ok",
    data: trip,
  });
});

export const tripController = {
  list,
  getById,
  createTrip,
  updateTrip,
  deletedTrip,
};
