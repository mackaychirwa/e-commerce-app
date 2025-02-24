import logger from '../logs/logger.js'; 

export const notFound = (req, res, next) => {
  const err = new Error("Route Not Found");
  err.status = 404;
  logger.error(err);
  res.status(err.status).json({ error: err.message });
};

export const errorHandler = (err, _req, res, _next) => {
  logger.error(err);
  if (err.error) {
    return res
      .status(err.status || 404)
      .json({ error: "No Internet connection" });
  }
  res
    .status(err.status || 500)
    .json({ error: err.message || "Unknown error" });
};
