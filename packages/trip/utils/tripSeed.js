import { Trip } from "../models";

export default async function tripSeed() {
  // ####### seed data for trip ######
  // delete old collection in database
  const drop = await Trip.collection.drop();
  if (drop) {
    console.log("old trip collections was deleted");
  } else {
    console.log("error drop old trip collections");
    return;
  }

  // seed data for coach
  const tripsData = [
    {
      origin: "Xã An Phú Tây - Huyện Bình Chánh - Thành phố Hồ Chí Minh",
      destination: "Xã Tân Hiệp - Huyện Hóc Môn - Thành phố Hồ Chí Minh",
      duration: 120,
      price:200000,
    },
    {
      origin: "Xã An Phú Tây - Huyện Bình Chánh - Thành phố Hồ Chí Minh",
      destination: "Phường Hòa Cường Nam - Quận Hải Châu - Thành phố Đà Nẵng",
      duration: 600,
      price: 500000
    },
    {
     origin: "Phường 01 - Quận 5 - Thành phố Hồ Chí Minh", 
     destination: "Xã Bình Thạnh Đông - Huyện Phú Tân - Tỉnh An Giang",
     duration: 300,
     price: 500000
    },
    {
      origin: "Phường Bến Thành - Quận 1 - Thành phố Hồ Chí Minh",
      destination: "Phường An Bình - Thành phố Dĩ An - Tỉnh Bình Dương",
      duration: 60,
      price: 100000
    },
    {
      origin: "Phường Bình An - Thành phố Dĩ An - Tỉnh Bình Dương",
      destination: "Xã Long Tân - Huyện Nhơn Trạch - Tỉnh Đồng Nai",
      duration: 180,
      price: 300000
    },
    {
     origin: "Phường Bình An - Thành phố Dĩ An - Tỉnh Bình Dương",
     destination: "Phường 1 - Thành phố Đà Lạt - Tỉnh Lâm Đồng",
     duration: 180,
     price: 300000
    },
    {
      origin: "Phường 1 - Thành phố Vũng Tàu - Tỉnh Bà Rịa - Vũng Tàu",
      destination: "Phường 1 - Thành phố Đà Lạt - Tỉnh Lâm Đồng",
      duration: 180,
      price: 300000
    },
    {
      origin: "Phường Ba Láng - Quận Cái Răng - Thành phố Cần Thơ",
      destination: "Phường 1 - Thành phố Đà Lạt - Tỉnh Lâm Đồng",
      duration: 180,
      price: 300000
    },
    {
      origin: "Phường Hòa An - Quận Cẩm Lệ - Thành phố Đà Nẵng",
      destination: "Phường 1 - Thành phố Đà Lạt - Tỉnh Lâm Đồng",
      duration: 180,
      price: 400000
    },
    {
     origin: "Phường Bến Thành - Quận 1 - Thành phố Hồ Chí Minh",
     destination: "Phường Bình Hiên - Quận Hải Châu - Thành phố Đà Nẵng",
     duration: 1320,
     price: 600000
    },
    {
      origin: "Phường Bình Hiên - Quận Hải Châu - Thành phố Đà Nẵng",
      destination: "Phường Bến Thành - Quận 1 - Thành phố Hồ Chí Minh",
      duration: 1320,
      price: 600000
    },
    {
    origin: "Phường Lộc Thọ - Thành phố Nha Trang - Tỉnh Khánh Hòa",
    destination: "Phường Bến Thành - Quận 1 - Thành phố Hồ Chí Minh",
    duration: 1320,
    price: 600000
    },
    {
      origin: "Phường Lộc Thọ - Thành phố Nha Trang - Tỉnh Khánh Hòa",
      destination: "Phường Bình Hiên - Quận Hải Châu - Thành phố Đà Nẵng",
      duration: 1320,
      price: 600000
    },
    {
     origin: "Phường Hòa Hiệp Bắc - Quận Liên Chiểu - Thành phố Đà Nẵng",
     destination: "Phường Lộc Thọ - Thành phố Nha Trang - Tỉnh Khánh Hòa",
     duration: 1320,
     price: 600000
    },
    {
      origin: "Phường Bến Nghé - Quận 1 - Thành phố Hồ Chí Minh",
      destination: "Phường Lộc Thọ - Thành phố Nha Trang - Tỉnh Khánh Hòa",
      duration: 1320,
      price: 600000
    },
  ];

  try{
    await Trip.insertMany(tripsData);
    console.log("trip collections was inserted");
  }
  catch(error){
    console.log("error when seed data for trip collections");
    console.error(error);
  }
}
