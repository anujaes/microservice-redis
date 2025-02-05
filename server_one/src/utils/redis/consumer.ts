import { Worker, Job } from "bullmq";
import { redisConnection } from "../../config/redis";
import { queueOneJobOne, queueOneJobTwo, queueTwoJobOne, queueTwoJobTwo } from "../../services/services";

/**
 * Defines queue structure
 */
interface QueueConfig {
    queueName: string;
    jobHandlers: Record<string, (job: Job) => Promise<void>>;
}

/**
 * Job Handlers
 */
const jobHandlers: QueueConfig[] = [
    {
        queueName: process.env.SERVER_TWO_QUEUE_A!,
        jobHandlers: {
            [process.env.QUEUE_A_JOB_ONE!]: queueOneJobOne,
            // [process.env.QUEUE_A_JOB_TWO!]: queueOneJobTwo,
        }
    },
    {
        queueName: process.env.SERVER_TWO_QUEUE_B!,
        jobHandlers: {
            [process.env.QUEUE_B_JOB_ONE!]: queueTwoJobOne,
            // [process.env.QUEUE_B_JOB_TWO!]: queueTwoJobTwo
        }
    }
];

/**
 * Initializes a worker for each queue
 */
const initializeWorker = (queueConfig: QueueConfig) => {
    new Worker(
        queueConfig.queueName,
        async (job) => {
            console.log(`\n⬇️ Job received queue::${job.queueName} job::${job.name} jobid::${job.id}`);
            const handler = queueConfig.jobHandlers[job.name];

            if (!handler) {
                console.error(`❌ No handler found for job "${job.name}" in queue "${queueConfig.queueName}"`);
                return;
            }

            try {
                await handler(JSON.parse(job.data));
            } catch (error) {
                console.error(`❌ Error processing job "${job.name}" in queue "${queueConfig.queueName}":`, error);
            }
        },
        redisConnection
    );

    console.log(`👷 Worker initialized for queue: ${queueConfig.queueName}`);
};

/**
 * Initializes all consumers dynamically
 */
export const initializeConsumers = async () => {
    jobHandlers.forEach(initializeWorker);
};