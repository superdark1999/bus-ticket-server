import pick from "shared/lib/utils/pick";
import catchAsync from "shared/lib/utils/catchAsync";
import { sendMessage } from "../kafka/kafka";
import coachService from "../services/coach.service";
import { TRIP_TOPICS } from "shared/lib/kafka/topic";

const list = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["startDate"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const result = await coachService.getCoaches(filter, options);
  return res.status(200).json({ data: result });
});

const getById = catchAsync(async (req, res) => {
  console.log(req.params.bookingId)
  const message = "message fsdfd";

  await sendMessage(TRIP_TOPICS.TEMP_TOPICS, JSON.stringify(message));

  return res.status(200).json({ name: "jsdkfdsl" });
});

export const bookingController = {
  list,
  getById,
};
