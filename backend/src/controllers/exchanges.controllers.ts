import { Request, Response } from 'express';
import { exchangeService } from '../services/index';
import httpStatus from 'http-status';

import catchAsync from '../utils/catchAsync';

const fetchStockExhanges = catchAsync(async (req: Request, res: Response) => {
	const exchanges = await exchangeService.fetchStockExhanges();
	res.status(httpStatus.OK).send(exchanges);
});

const fetchStocks = catchAsync(async (req: Request, res: Response) => {
	const exchangeCode = req.params.exchangeCode;
	const exchanges = await exchangeService.fetchTopStocksOfExchange(exchangeCode);
	res.status(httpStatus.OK).send(exchanges);
});

const fetchStockDetails = catchAsync(async (req: Request, res: Response) => {
	const exchangeCode = req.params.exchangeCode;
	const stockCode = req.params.stockCode;
	const exchanges = await exchangeService.fetchStockDetails(exchangeCode, stockCode);
	res.status(httpStatus.OK).send(exchanges);
});

export { fetchStockExhanges, fetchStocks, fetchStockDetails };
