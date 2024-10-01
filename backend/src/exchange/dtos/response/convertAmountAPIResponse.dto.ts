import { IInfo } from '../../utils/interfaces/iInfo';
import { IQuery } from '../../utils/interfaces/iQuery';

export interface ConvertAmountAPIResponseDto {
	date: string;
	info: IInfo;
	query: IQuery;
	result: number;
	success: boolean;
}
