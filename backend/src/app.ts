import express from 'express';
import rateRoutes from './infrastructure/express/routes/rate.routes';
import {notFoundMiddleware} from './infrastructure/express/middleware/notFoundMiddleware';

const app = express();
app.use(express.json());

app.use('/api/rate', rateRoutes);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

