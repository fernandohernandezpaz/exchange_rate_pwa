import { IInfo } from './iInfo';
import { IQuery } from './iQuery';

export interface IConvertAmountResponse {
	date: string;
	info: IInfo;
	query: IQuery;
	result: number;
	success: boolean;
}
