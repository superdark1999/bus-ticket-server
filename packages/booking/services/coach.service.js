import { tickets } from "../models";

const getCoaches = async (filter, options) => {
  const { results, ...others } = await tickets.paginate(filter, options);

  return {
    results,
    ...others,
  };
};

export default {
  getCoaches,
};
