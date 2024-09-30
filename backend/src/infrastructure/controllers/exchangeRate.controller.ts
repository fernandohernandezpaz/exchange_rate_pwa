import {Request, Response} from 'express';
import {ConvertAmountRequestDto} from '../adapters/http/ConvertAmountRequest.dto';
import {GetRateRequestDto} from '../adapters/http/GetRateRequest.dto';
import {ExchangeRateService} from '../../application/exchangeRateService';
import {ExchangeRateAPIAdapter} from '../adapters/exchangeRateAPI.adapter';

export const convertAmount = async (req: Request, res: Response) => {
    const {baseCurrency, targetCurrency, amount} = req.query as unknown as ConvertAmountRequestDto;
    if (!baseCurrency || !targetCurrency || !amount) {
        res.status(400).json({
            error: 'Please provide baseCurrency, targetCurrency and amount',
        });
    }

    const exchangeRateApiAdapter = new ExchangeRateAPIAdapter();
    const exchangeRateService = new ExchangeRateService(exchangeRateApiAdapter);

    try {
        const rate = await exchangeRateService.convertAmount(
            baseCurrency,
            targetCurrency,
            amount,
        );
        res.json({
            baseCurrency,
            targetCurrency,
            rate,
        });
    } catch (_error) {
        res.status(500).json({error: 'Failed to retrieve exchange rate'});
    }
};

export const getRate = async (req: Request, res: Response) => {
    const {baseCurrency, targetCurrency, date} = req.query as unknown as GetRateRequestDto;
    if (!baseCurrency || !targetCurrency || !date) {
        res.status(400).json({
            error: 'Please provide baseCurrency, targetCurrency and date',
        });
    }

    const exchangeRateApiAdapter = new ExchangeRateAPIAdapter();
    const exchangeRateService = new ExchangeRateService(exchangeRateApiAdapter);

    try {
        const rate = await exchangeRateService.getRate(
            baseCurrency,
            targetCurrency,
            date,
        );
        res.json({
            baseCurrency,
            targetCurrency,
            rate,
        });
    } catch (_error) {
        res.status(500).json({error: 'Failed to retrieve exchange rate'});
    }
}
