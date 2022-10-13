import { asyncRoute } from "../server/async-route.helper";
import { Route } from "../server/route.interface";

export const PingRoute: Route = {
    method: "get",
    route: "/ping",

    docs: {
        description: "ping",
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: {
                            type: "string",
                            enum: ["pong"],
                        },
                    },
                },
            },
        },
    },
    handler: [
        asyncRoute(async (req, res) => {
            return res.json("pong");
        }),
    ],
};
