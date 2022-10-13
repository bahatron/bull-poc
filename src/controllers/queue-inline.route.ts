import { asyncRoute } from "../server/async-route.helper";
import { Route } from "../server/route.interface";
import { $bull } from "../services/bull";
import { $logger } from "../services/logger";

const queue = $bull.createQueue("in_file_queue");

queue.process(async (job) => {
    $logger.info(job.data, `processing queue two job`);
});

export const InlineQueueRoute: Route = {
    method: "post",
    route: "/queue/in-file",
    docs: {
        description: "adds a job to in-file queue",
    },
    handler: [
        asyncRoute(async (req, res) => {
            await queue.add({ foo: "bar" });

            return res.status(204).json();
        }),
    ],
};
