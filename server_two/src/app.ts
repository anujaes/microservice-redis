import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeProducerQueues } from "./utils/redis/queues";
import { initializeConsumers } from "./utils/redis/consumer";
import routes from "./routes/routes";

const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/server-one", routes);


(async () => {
    await initializeProducerQueues(
        [
            process.env.SERVER_TWO_QUEUE_A!,
            process.env.SERVER_TWO_QUEUE_B!,
        ]
    );
    await initializeConsumers();
})();

export default app;