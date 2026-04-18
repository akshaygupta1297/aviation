const winston = require("winston");
const config = require("./config");

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    daily: 3,
    dailyError: 4,
    debug: 5,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "blue",
    daily: "gray",
    debug: "magenta",
  },
};

const LOGGER_MSG_ICONS = {
  error: "📕",
  warn: "📙",
  info: "📗",
  unknown: "🔘",
  daily: "📗",
  dailyError: "📕",
};

const LOGGER_MSG_COLORS = {
  error: "bold red",
  warn: "italic yellow",
  info: "bold blue",
  daily: "bold blue",
  dailyError: "bold red",
};
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// Custom filter to allow only daily and dailyError levels
const dailyFilter = winston.format((info) => {
  return info.level === "daily" || info.level === "dailyError" ? info : false;
});

winston.addColors(LOGGER_MSG_COLORS);
const logger = winston.createLogger({
  levels: customLevels.levels,
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`),

    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    winston.format.printf(({ label, level, message, timestamp }) => {
      const cleanLevel = level.replace(/\u001b\[.*?m/g, "");
      // const pre = MSG_PREFIXES[cleanLevel as keyof typeof MSG_PREFIXES] || '';
      return `${LOGGER_MSG_ICONS[cleanLevel]} [${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
    new winston.transports.File({
      filename: "app-combined.log",
    }),
    new winston.transports.File({
      filename: "app-warning.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "app-information.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "app-error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "app-daily-impact.log",
      level: "daily",
      format: winston.format.combine(dailyFilter()),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exception.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "rejections.log" }),
  ],
});

module.exports = logger;
