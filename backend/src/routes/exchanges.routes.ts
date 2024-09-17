import express from 'express';
import { exchangesController } from '../controllers';

const router = express.Router();

router.route('/').get(exchangesController.fetchStockExhanges);

router.route('/:exchangeCode/stocks').get(exchangesController.fetchStocks);

router.route('/:exchangeCode/stocks/:stockCode').get(exchangesController.fetchStockDetails);

export default router;
