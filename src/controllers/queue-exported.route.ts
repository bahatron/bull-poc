import { ExportedQueue } from "../queues/exported-queue";
import { asyncRoute } from "../server/async-route.helper";
import { Route } from "../server/route.interface";

export const ExportedQueueRoute: Route = {
    method: "post",
    route: "/queue/exported",
    docs: {
        description: "adds a job directly to exported queue",
    },
    handler: [
        asyncRoute(async (req, res) => {
            await ExportedQueue.add({ msg: `Hello !` });

            return res.status(204).json();
        }),
    ],
};
