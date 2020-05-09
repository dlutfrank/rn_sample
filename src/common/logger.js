// import {Device} from 'miot';
// import smarthome from 'miot/service/smarthome';

const logger = console;

logger.debug = console.info;
logger.trace = console.log;

// 注入米家打点
// const methods = ['info', 'warn', 'log', 'error'];
// methods.forEach((method) => {
//   var f = logger[method];
//   logger[method] = function () {
//     const log = Array.prototype.slice.call(arguments);
//     smarthome.reportLog(Device.model, log);
//     f.apply(logger, arguments);
//   };
// });
if (window) {
  window.logger = logger;
}
if (global) {
  global.logger = logger;
}

export default logger;
