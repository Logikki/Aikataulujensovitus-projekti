const app = require("./app");
const http = require("http");
const logger = require("./utils/logger");
require("dotenv").config();
const PORT = process.env.PORT;
const server = http.createServer(app);
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
