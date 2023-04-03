import models from "../models";

export default async function seed() {
  // seed data for triproute
  const tripRoutes = [
    {
      origin: "Sài Gòn",
      destination: "Quảng Trị",
      duration: 20,
      price: 700000,
    },
    {
      origin: "Sài Gòn",
      destination: "Vũng Tàu",
      duration: 2,
      price: 700000,
    },
    {
      origin: "Đồng Nai",
      destination: "Sài Gòn",
      duration: 2,
      price: 700000,
    },
    {
      origin: "Bình Dương",
      destination: "Sài Gòn",
      duration: 2,
      price: 700000,
    },
    {
      origin: "Vũng Tàu",
      destination: "Sài Gòn",
      duration: 2,
      price: 700000,
    },
  ];

  await models.trip_route
    .insertMany(tripRoutes)
    .then(() => console.log("trip routes was inserted"))
    .catch((err) => console.error(err));
}
