export interface ExchangeRatePort {
    convertAmount(baseCurrency: string, targetCurrent: string, amount: string): Promise<number>;

    getRate(baseCurrency: string, targetCurrent: string, date: Date): Promise<number>;


}
