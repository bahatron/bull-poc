import express, { Router } from "express";
import { Route } from "./server/route.interface";
import { ErrorRequestHandler } from "express";
import swaggerUi from "swagger-ui-express";
import { createSwaggerDocs } from "./server/swagger";
import { BullMonitorExpress } from "@bull-monitor/express";
import { BullAdapter } from "@bull-monitor/root/dist/bull-adapter";
import { $bull } from "./services/bull";
import { PingRoute } from "./controllers/ping.route";
import { ExportedQueueRoute } from "./controllers/queue-exported.route";
import { InlineQueueRoute } from "./controllers/queue-inline.route";
import { ServiceQueueRoute } from "./controllers/queue-service.route";
import { QueueBreakdownRoute } from "./controllers/list-queues";

const ROUTES: Route[] = [
    PingRoute,
    ExportedQueueRoute,
    InlineQueueRoute,
    ServiceQueueRoute,
    QueueBreakdownRoute,
];

export async function AppServer() {
    const app = express();
    const router = Router();

    for (let route of ROUTES) {
        router[route.method](route.route, route.handler);
    }

    let swaggerDocs = createSwaggerDocs({
        routes: ROUTES,
        info: {
            description: "A collection of exposed endpoints",
            version: "0.1.0",
        },
    });

    router.get("/", (req, res) => res.redirect("/docs"));
    router.use("/docs", swaggerUi.serve);
    router.get("/docs", swaggerUi.setup(swaggerDocs));

    const monitor = new BullMonitorExpress({
        queues: $bull.QUEUES.map((queue) => new BullAdapter(queue)),
        gqlIntrospection: false,
        metrics: {
            maxMetrics: 100,
        },
    });

    await monitor.init();

    app.use(express.json());
    app.use(router);
    app.use("/bull", monitor.router);

    app.use(function errorHandler(err, req, res, next) {
        return res.status(500).json(err);
    } as ErrorRequestHandler);

    return app;
}
