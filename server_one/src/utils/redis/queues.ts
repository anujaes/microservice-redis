import { Queue } from "bullmq";
import { redisConnection } from "../../config/redis";

const redisQueues: Record<string, Queue> = {};

/**
 * Initializes BullMQ queues dynamically based on queue names.
 * @param queueNames - An array of queue names to initialize.
 */
export const initializeProducerQueues = async (queueNames: string[]) => {
    for (const name of queueNames) {
        redisQueues[name] = new Queue(name, redisConnection);
        console.log(`✅ Queue Initialized: ${name}`);
    }
};

export default redisQueues;
