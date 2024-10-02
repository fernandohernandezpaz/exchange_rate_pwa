import { Router } from 'express';
import { convertAmount, getRate } from './controllers/exchangeRate.controller';

const router = Router();
router.get('/convert_amount/', convertAmount);
router.get('/get_rate/', getRate);

export default router;