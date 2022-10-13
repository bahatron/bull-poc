import { asyncRoute } from "../server/async-route.helper";
import { Route } from "../server/route.interface";
import { $bull } from "../services/bull";
import { $logger } from "../services/logger";

export const QueueBreakdownRoute: Route = {
    method: "get",
    route: "/queues",
    docs: {
        description: "list jobs",
    },

    handler: [
        asyncRoute(async (req, res) => {
            let breakdown = Promise.all(
                $bull.QUEUES.map(async (queue) => {
                    return {
                        name: queue.name,
                        completed: await queue.getCompletedCount(),
                        failed: await queue.getFailedCount(),
                    };
                }),
            );

            $logger.info(breakdown);

            return res.json(breakdown);
        }),
    ],
};
