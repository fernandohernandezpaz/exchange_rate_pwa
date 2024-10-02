import { Rate } from '../../utils/interfaces/rate.interface';

export interface GetExchangeRateApiResponseDto {
	date: string;
	success: boolean;
	timestamp: number;
	base: string;
	historical: boolean;
	rates: Rate;
}
