import { Request, Response } from 'express';
import { addJobToQueue } from '../utils/redis/producer';

export const produceMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const queName = process.env.SERVICE_ONE_QUEUE_NAME_TWO!;
        const jobName = process.env.SERVICE_ONE_QUEUE_NAME_TWO_JOB_ONE!;
        const result = await addJobToQueue(queName, jobName, req.body);
        // console.log(`Job added to the queue::${queName} res::${JSON.stringify(result)}`);

        res.status(201).send({ message: 'Example POST request' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
