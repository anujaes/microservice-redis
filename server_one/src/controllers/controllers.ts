import { Request, Response } from 'express';
import { addJobToQueue } from '../utils/redis/producer';

export const produceMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const queName = process.env.SERVER_ONE_QUEUE_X!;
        const jobName = process.env.QUEUE_X_JOB_ONE!;
        const result = await addJobToQueue(queName, jobName, req.body, 10000);
        console.log(`Job added to the queue::${queName} res::${JSON.stringify(result)}`);

        res.status(201).send({ message: 'Meessage sent to queue' + queName });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
