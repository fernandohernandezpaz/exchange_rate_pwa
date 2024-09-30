import axios, {AxiosResponse, AxiosHeaders} from 'axios';
import {config} from '../../config/config';
import {ExchangeRatePort} from '../../domain/ports/exchangeRate.port';
import {IConvertAmountResponse} from '../../interfaces/iConvertAmountResponse';
import {IGetExchangeRateResponse} from '../../interfaces/iGetExchangeRateResponse';
import {createQueryString, joinURL} from '../../utils/string.utils';

export class ExchangeRateAPIAdapter implements ExchangeRatePort {
    private apiKey: string = config.apiKey;
    private apiDomain: string = config.apiDomain;

    headers(): AxiosHeaders {
        const myHeaders = new AxiosHeaders();
        myHeaders.set('apikey', this.apiKey);
        return myHeaders;
    }

    async convertAmount(
        baseCurrency: string,
        targetCurrency: string,
        amount: string,
    ): Promise<number> {
        try {
            const queryParameters = createQueryString({
                from: baseCurrency,
                to: targetCurrency,
                amount,
            });

            const response: AxiosResponse<IConvertAmountResponse> = await axios.get(
                joinURL(this.apiDomain, `/exchangerates_data/convert?${queryParameters}`),
                {
                    headers: this.headers(),
                },
            );
            const {result} = response.data;
            return result;
        } catch (error) {
            console.error('Error converting amount:', error);
            throw new Error('Could not fetch exchange rate');
        }
    }

    async getRate(baseCurrency: string, targetCurrency: string, date: Date): Promise<number | null> {
        try {
            const dateSelected = date ?? new Date().getDate().toString();
            const queryParameters = createQueryString({
                symbols: targetCurrency,
                base: baseCurrency,
            });
            const response: AxiosResponse<IGetExchangeRateResponse> = await axios.get(
                joinURL(this.apiDomain, `/exchangerates_data/${dateSelected}?${queryParameters}`),
                {
                    headers: this.headers(),
                },
            );
            const {rates} = response.data;
            return rates[targetCurrency] ?? null;
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            throw new Error('Could not fetch exchange rate');
        }
    }
}
