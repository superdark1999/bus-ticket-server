import pick from "shared/lib/utils/pick";
import coachService from "../services/coach.service";

const list = async (req, res) => {
  const filter = pick(req.query, ["startDate"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const result = await coachService.getCoaches(filter, options);
  return res.status(200).json({ data: result });
};

const getById = () => {};

export const coachController = {
  list,
  getById,
};
