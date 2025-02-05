import { RedisOptions } from "ioredis";

export const redisConfig: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
};

export const redisConnection = { connection: redisConfig };
