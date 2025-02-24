import logger from "../logs/logger.js";

export const requestLogger = (req, res, next) => {
  logger.info({ method: req.method, url: req.url, ip: req.ip }, "Incoming request");
  next();
};
