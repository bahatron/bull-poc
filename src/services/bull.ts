import Queue from "bull";
import { $logger } from "./logger";

function BullService() {
    const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
    $logger.debug(`redis url: ${REDIS_URL}`);

    const QUEUES: Queue.Queue[] = [];

    return {
        get QUEUES() {
            return QUEUES;
        },

        createQueue(name: string) {
            let queue = new Queue(name, REDIS_URL, {
                defaultJobOptions: {
                    attempts: 3,
                    backoff: {
                        delay: 100 + Math.random() * 300,
                        type: "exponential",
                    },
                },
            });

            QUEUES.push(queue);

            return queue;
        },
    };
}

export const $bull = BullService();
