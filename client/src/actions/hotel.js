import axios from "axios";

export const createHotel = async (data) =>
  await axios.post(
    `https://ay1h3z9wt0.execute-api.us-east-1.amazonaws.com/prod/room`,
    data
  );

export const allHotels = async () =>
  await axios.get(
    `https://ay1h3z9wt0.execute-api.us-east-1.amazonaws.com/prod/room`
  );

export const allMenu = async () =>
  await axios.get(
    `https://61vzqlv1fa.execute-api.us-east-1.amazonaws.com/prod/menu`
  );

export const allTours = async () =>
  await axios.get(
    `https://nue260zeb8.execute-api.us-east-1.amazonaws.com/prod/tour`
  );

export const bookRoom = async (data) => {
  return await axios.post(
    `https://serverless-project-apigateway-8y9e544e.uc.gateway.dev/bookroom`,
    data
  );
};
export const bookTour = async (data) => {
  return await axios.post(
    `https://serverless-project-apigateway-8y9e544e.uc.gateway.dev/booktour`,
    data
  );
};
export const bookMeal = async (data) => {
  return await axios.post(
    `https://serverless-project-apigateway-8y9e544e.uc.gateway.dev/bookmeal`,
    data
  );
};

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

export const read = async (hotelId) =>
  await axios.get(
    `https://ay1h3z9wt0.execute-api.us-east-1.amazonaws.com/prod/room/${hotelId}`
  );

export const hotelById = async (hotelId) =>
  await axios.get(
    `https://ay1h3z9wt0.execute-api.us-east-1.amazonaws.com/prod/room/${hotelId}`
  );
