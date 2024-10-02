import { CurrencyEnum } from '../enums/currency.enum';

export interface Rate {
	// @ts-ignore
	[key in CurrencyEnum]: number;
}
