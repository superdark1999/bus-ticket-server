import { firstValueFrom } from "rxjs";
import { TRIP_TOPICS } from "shared/lib/kafka/topic";
import catchAsync from "shared/lib/utils/catchAsync";
import pick from "shared/lib/utils/pick";
import { kafkaClient } from "../index";
import coachService from "../services/coach.service";

const list = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["startDate"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const result = await coachService.getCoaches(filter, options);
  return res.status(200).json({ data: result });
});

const getById = catchAsync(async (req, res) => {
  const message = req.params.bookingId;

  const value = await firstValueFrom(
    kafkaClient.sendMessage(TRIP_TOPICS.GET_TRIP, JSON.stringify(message))
  );

  return res.status(200).json({ data: value });
});

export const bookingController = {
  list,
  getById,
};
