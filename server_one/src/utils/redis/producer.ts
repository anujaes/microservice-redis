import { Job } from "bullmq";
import redisQueues from "./queues";

/**
 * Function to add jobs dynamically to a queue.
 * @param queueName - Name of the queue to which the job needs to be added.
 * @param jobName - Name of the job being added.
 * @param data - Payload data for the job.
 * @returns A promise resolving to the job added.
 */

export const addJobToQueue = async (queueName: string, jobName: string, data: any): Promise<Job | null> => {
    try {
        // Check if queue exists
        if (!redisQueues[queueName]) {
            console.error(`❌ Queue "${queueName}" not found. Available queues:`, Object.keys(redisQueues));
            throw new Error(`Queue "${queueName}" not found`);
        }

        console.log(`\n⏳ Adding job "${jobName}" to queue "${queueName}"...`);

        // Add job to the queue
        const job = await redisQueues[queueName].add(jobName, JSON.stringify(data), {
            attempts: 3,
            removeOnComplete: true,
        });

        console.log(`✅ Job successfully added to "${queueName}" (ID: ${job.id})`);
        return job;
    } catch (error: any) {
        console.error(`❌ Failed to add job to queue "${queueName}":`, error.message);
        return null;
    }
};
