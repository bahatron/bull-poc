import { $bull } from "../services/bull";
import { $logger } from "../services/logger";

const queue = $bull.createQueue("service_queue");

queue.process(async (job) => {
    $logger.info(job.data, "processing job in SERVICE QUEUE");
});

export async function queueJob(payload: any) {
    await queue.add(payload);
}
