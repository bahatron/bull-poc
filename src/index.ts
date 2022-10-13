import { AppServer } from "./app";
import { $logger } from "./services/logger";

AppServer().then((app) => {
    app.listen(3000);
    $logger.info("server running");
});
