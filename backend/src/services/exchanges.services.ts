import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const fetchStockExhanges = async () => {
	try {
		const responseData = await fetch('http://localhost:3000/StockData.json'); // Ensure this path is correct
		const data = await responseData.json();
		return data.map((item) => {
			return { name: item.stockExchange, code: item.code };
		});
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
	}
};

const fetchTopStocksOfExchange = async (exchangeCode) => {
	try {
		const responseData = await fetch('http://localhost:3000/StockData.json'); // Ensure this path is correct
		const data = await responseData.json();

		const exchange = data.find((item) => item.code === exchangeCode);

		if (!exchange) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Exchange not found');
		}

		return exchange.topStocks.map((stock) => ({
			code: stock.code,
			name: stock.stockName,
		}));
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
	}
};


const fetchStockDetails = async (exchangeCode, stockCode) => {
  try {
    const responseData = await fetch('http://localhost:3000/StockData.json'); // Ensure this path is correct
    const data = await responseData.json();
    
    const exchange = data.find(ex => ex.code === exchangeCode);
    if (!exchange) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Exchange not found');
    }
    
    const stock = exchange.topStocks.find(s => s.code === stockCode);
    if (!stock) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Stock not found in the specified exchange');
    }
    
    return {
      ...stock,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
};

export { fetchStockExhanges, fetchTopStocksOfExchange, fetchStockDetails };
