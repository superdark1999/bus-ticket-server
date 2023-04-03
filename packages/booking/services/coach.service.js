import models from '../models';

const getCoaches = async (filter, options) => {
  const { results, ...others } = await models.ticket.paginate(filter, options);

  return {
    results,
    ...others,
  };
};

export default {
  getCoaches,
};
