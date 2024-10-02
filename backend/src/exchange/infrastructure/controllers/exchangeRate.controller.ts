import { Request, Response } from 'express';
import { ConvertAmountRequestDto } from '../../dtos/request/convertAmountRequest.dto';
import { GetRateRequestDto } from '../../dtos/request/getRateRequest.dto';
import { ExchangeRateService } from '../../application/services/exchangeRateService';
import { ConvertAmountResponseDto } from '../../dtos/response/convertAmountResponse.dto';
import { GetExchangeRateResponseDto } from '../../dtos/response/getExchangeRateResponse.dto';
import { ErrorResponseDto } from '../../../shared/dtos/errorResponse.dto';
import { ExchangeRateAPIAdapter } from '../adapters/exchangeRateAPI.adapter';
import { cast } from '../../../shared/utils/cast.utils';

const exchangeRateApiAdapter = new ExchangeRateAPIAdapter();
const exchangeRateService = new ExchangeRateService(exchangeRateApiAdapter);

export const convertAmount = async (
	req: Request,
	res: Response<ConvertAmountResponseDto | ErrorResponseDto>,
) => {
	const { baseCurrency, targetCurrency, amount } = cast<ConvertAmountRequestDto>(req.query);
	if (!baseCurrency || !targetCurrency || !amount) {
		res.status(400).json({
			error: 'Please provide baseCurrency, targetCurrency and amount',
		});
	}

	try {
		const amountCasted = await exchangeRateService.convertAmount(
			baseCurrency,
			targetCurrency,
			amount,
		);
		res.json({
			baseCurrency,
			targetCurrency,
			amountCasted,
		});
	} catch (_error) {
		res.status(500).json({ error: 'Failed to retrieve exchange rate' });
	}
};

export const getRate = async (
	req: Request,
	res: Response<GetExchangeRateResponseDto | ErrorResponseDto>,
) => {
	const { baseCurrency, targetCurrency, date } = cast<GetRateRequestDto>(req.query);
	if (!baseCurrency || !targetCurrency || !date) {
		res.status(400).json({
			error: 'Please provide baseCurrency, targetCurrency and date',
		});
	}

	try {
		const rate = await exchangeRateService.getRate(baseCurrency, targetCurrency, date);
		res.json({
			baseCurrency,
			targetCurrency,
			rate,
		});
	} catch (_error) {
		res.status(500).json({ error: 'Failed to retrieve exchange rate' });
	}
};
