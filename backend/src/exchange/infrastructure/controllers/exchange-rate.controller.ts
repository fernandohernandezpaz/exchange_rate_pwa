import { Request, Response } from 'express';
import { ConvertAmountRequestDto } from '../../dtos/request/convert-amount-request.dto';
import { GetRateRequestDto } from '../../dtos/request/get-rate-request.dto';
import { ExchangeRateService } from '../../application/services/exchange-rate.service';
import { ConvertAmountResponseDto } from '../../dtos/response/convert-amount-response.dto';
import { GetExchangeRateResponseDto } from '../../dtos/response/get-exchange-rate-response.dto';
import { ErrorResponseDto } from '../../../shared/dtos/errorResponse.dto';
import { ExchangeRateApiAdapter } from '../adapters/exchange-rate-api.adapter';
import { cast } from '../../../shared/utils/cast.utils';

const exchangeRateApiAdapter = new ExchangeRateApiAdapter();
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
