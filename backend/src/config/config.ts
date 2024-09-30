import dotenv from 'dotenv';

dotenv.config();

if (!process.env.API_KEY) {
	throw new Error('API_KEY is not defined in environment!');
}

export const config = {
	apiKey: process.env.API_KEY,
	port: process.env.PORT || 3000,
	apiDomain: process.env.API_DOMAIN,
	env: process.env.NODE_ENV || 'development',
};
