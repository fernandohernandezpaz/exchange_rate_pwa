import { Rate } from '../../utils/interfaces/iRate'

export interface GetExchangeRateAPIResponseDto {
    date: string;
    success: boolean;
    timestamp: number;
    base: string,
    historical: boolean,
    rates: Rate,
}
