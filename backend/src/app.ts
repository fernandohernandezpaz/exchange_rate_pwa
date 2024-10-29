import express from 'express';
import { config } from './config/config';
import rateRoutes from './exchange/infrastructure/rate.routes';
import { notFoundMiddleware } from './shared/middleware/notFoundMiddleware';

const app = express();
app.use(express.json());

app.use('/api/rate/', rateRoutes);
app.use(notFoundMiddleware);

app.listen(config.port, () => {
	// eslint-disable-line no-console
	console.log(`App listening on port ${config.port}`);
});
