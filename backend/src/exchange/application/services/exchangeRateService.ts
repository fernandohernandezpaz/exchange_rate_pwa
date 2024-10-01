import {ExchangeRatePort} from '../../domain/ports/exchangeRate.port';

export class ExchangeRateService {
    private exchangeRatePort: ExchangeRatePort;

    constructor(exchangeRatePort: ExchangeRatePort) {
        this.exchangeRatePort = exchangeRatePort;
    }

    async convertAmount(
        baseCurrency: string,
        targetCurrency: string,
        amount: string,
    ): Promise<number | null> {
        return this.exchangeRatePort.convertAmount(baseCurrency, targetCurrency, amount);
    }

    async getRate(
        baseCurrency: string,
        targetCurrency: string,
        date: Date
    ): Promise<number | null> {
        return this.exchangeRatePort.getRate(baseCurrency, targetCurrency, date);
    }
}
