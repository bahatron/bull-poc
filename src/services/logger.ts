import { Logger } from "@bahatron/utils";

export const $logger = Logger.Logger({
    id: "bull-poc",
    pretty: process.env.NODE_ENV !== "production",
});
