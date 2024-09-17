import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

const fetchStockExhanges = async () => {
  try {
    const responseData = await fetch('http://localhost:3000/StockData.json'); // Ensure this path is correct
    if (!responseData.ok) {
      throw new ApiError(responseData.status, responseData.statusText);
    }
    const data = await responseData.json();
    return data.map((item) => item.stockExchange);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
}

export {
  fetchStockExhanges
}