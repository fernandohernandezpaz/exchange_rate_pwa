
export interface GetExchangeRateAPIResponseDto {
    date: string;
    success: boolean;
    timestamp: number;
    base: string,
    historical: boolean,
    rates: Record<string, number>,
}
