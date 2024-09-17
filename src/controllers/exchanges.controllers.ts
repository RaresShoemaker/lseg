import {Request, Response} from 'express';
import {exchangeService} from '../services/index';
import httpStatus from 'http-status';

import catchAsync from '../utils/catchAsync';

const fetchStockExhanges = catchAsync(async (req: Request, res: Response) => { 
  const exchanges = await exchangeService.fetchStockExhanges();
  res.status(httpStatus.OK).send(exchanges);
});

export {
  fetchStockExhanges
}
