const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const dotenv = require("dotenv");
const logger = require("./config/logger");
dotenv.config();

server.listen(process.env.PORT, () => {
  logger.info(`app is start running on port ${process.env.PORT}`);
});
