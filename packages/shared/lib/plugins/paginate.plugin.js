const paginate = (schema) => {
  schema.statics.paginate = async function (filter, options) {
    for (const [key, value] of Object.entries(filter)) {
      if (Array.isArray(value)) {
        filter[key] = {
          $in: value,
        };
      }
    }

    let sort = "";
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(",").forEach((sortOption) => {
        const [key, order] = sortOption.split(":");
        sortingCriteria.push((order === "desc" ? "-" : "") + key);
      });
      sort = sortingCriteria.join(" ");
    } else {
      sort = "-createdAt";
    }

    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;
    const skip = (page - 1) * limit;
    let { unixTimestamp, duration, ...updatedFilter } = filter;
    if (duration) {
      const durationArray = duration.split(",");

      const durationFilter = {
        $gte: durationArray[0],
        $lte: durationArray[1],
      };

      updatedFilter = {
        ...updatedFilter,
        duration: durationFilter,
      };
    } 

    const countPromise = this.countDocuments(updatedFilter).exec();
    let docsPromise = this.find(updatedFilter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    if (options.populate) {
      options.populate.split(",").forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split(".")
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

export default paginate;
