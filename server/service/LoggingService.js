const pino = require('pino');
const path = require("path");

// configuration for pino with pretty console output and logfile output
const transports = pino.transport({
  targets: [
    {
      level: 'info',
      target: 'pino-pretty',
      options: { colorize: true }
    },
    {
      level: 'trace',
      target: 'pino/file',
      options: { destination: path.join(__dirname, '../logs/NotificationProxy.log'), mkdir: true }
    }
  ]
});

// create pino logger instance
const logger = pino({level: 'trace'}, transports);

exports.getLogger = function getLogger() {
  return logger;
};
