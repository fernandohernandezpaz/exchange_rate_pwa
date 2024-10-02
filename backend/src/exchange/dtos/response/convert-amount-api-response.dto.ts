import { InfoInterface } from '../../utils/interfaces/info.interface';
import { QueryInterface } from '../../utils/interfaces/query.interface';

export interface ConvertAmountApiResponseDto {
	date: string;
	info: InfoInterface;
	query: QueryInterface;
	result: number;
	success: boolean;
}
