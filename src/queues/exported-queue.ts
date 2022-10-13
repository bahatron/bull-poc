import { $bull } from "../services/bull";
import { $logger } from "../services/logger";

export const ExportedQueue = $bull.createQueue("exported_queue");

ExportedQueue.process(async (job) => {
    return new Promise<void>((resolve) => {
        $logger.info(job.data, `processing job on EXPORTED QUEUE`);

        setTimeout(resolve, 1000);
    });
});
