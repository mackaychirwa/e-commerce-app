import pino from "pino";
import pretty from "pino-pretty";
import fs from "fs";
import path from "path";

// Ensure logs directory exists
const logDir = path.resolve("./logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const stream = pretty({
  destination: path.join(logDir, "errors.log"),
  translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
  ignore: "pid,hostname",
  mkdir: true,
  colorize: true,
});

const logger = pino({}, stream);

export default logger;
