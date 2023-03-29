import { Coach } from "../models";

const getCoaches = async (filter, options) => {
  const { results, ...others } = await Coach.paginate(filter, options);

  return {
    results,
    ...others,
  };
};

export default {
  getCoaches,
};
