import { queueJob } from "../queues/service-queue";
import { asyncRoute } from "../server/async-route.helper";
import { Route } from "../server/route.interface";

export const ServiceQueueRoute: Route = {
    method: "post",
    route: "/queue/service",
    docs: {
        description: "adds a job through a handler function",
    },
    handler: [
        asyncRoute(async (req, res) => {
            await queueJob({ ping: "pong" });

            return res.status(204).json();
        }),
    ],
};
