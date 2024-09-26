import express from "express";
import rateRoutes from "./infrastructure/express/routes/rate.routes";

const app = express();
app.use(express.json());
app.use('/api/rate', rateRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

