import pick from "shared/lib/utils/pick";
import catchAsync from "shared/lib/utils/catchAsync";
import coachService from "../services/coach.service";

const list = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["startDate"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const result = await coachService.getCoaches(filter, options);
  return res.status(200).json({ data: result });
});

const getById = catchAsync(() => {});

export const coachController = {
  list,
  getById,
};
