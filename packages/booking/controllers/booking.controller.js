import pick from "shared/lib/utils/pick";
import catchAsync from "shared/lib/utils/catchAsync";
import { sendMessage } from "../kafka/kafka";
import coachService from "../services/coach.service";
import { ADMIN_TOPICS } from "shared/lib/kafka/topic";
import { consumer } from "../kafka/kafka";

const list = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["startDate"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const result = await coachService.getCoaches(filter, options);
  return res.status(200).json({ data: result });
});

const getById = catchAsync(async (req, res) => {
  const message = "message fsdfd";

  await sendMessage(ADMIN_TOPICS.TEMP_TOPICS, JSON.stringify(message));

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // if (ADMIN_TOPICS.TEMP_BACK_TOPICS)
      console.log("data sdfsdafsd----", data);
    },
  });

  return res.status(200).json({ name: "jsdkfdsl" });
});

export const bookingController = {
  list,
  getById,
};
