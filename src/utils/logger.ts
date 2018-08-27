/*
 * Copyright 2018 Primas Lab Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import chalk = require('chalk');
import log = require('loglevel');
import prefix = require('loglevel-plugin-prefix');

// function format(date: Date | string | number, fmt = 'YYYY-MM-DD HH:mm:ss') {
//   if (!date) {
//     return '';
//   }
//   if (typeof date === 'string') {
//     date = new Date(date.replace(/-/g, '/'));
//   }
//   if (typeof date === 'number') {
//     date = new Date(date);
//   }
//   const o: any = {
//     'M+': date.getMonth() + 1,
//     'D+': date.getDate(),
//     'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
//     'H+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds(),
//     'q+': Math.floor((date.getMonth() + 3) / 3),
//     S: date.getMilliseconds(),
//   };
//   const week: any = {
//     '0': '\u65e5',
//     '1': '\u4e00',
//     '2': '\u4e8c',
//     '3': '\u4e09',
//     '4': '\u56db',
//     '5': '\u4e94',
//     '6': '\u516d',
//   };
//   if (/(Y+)/.test(fmt)) {
//     fmt = fmt.replace(
//       RegExp.$1,
//       (date.getFullYear() + '').substr(4 - RegExp.$1.length)
//     );
//   }
//   if (/(E+)/.test(fmt)) {
//     fmt = fmt.replace(
//       RegExp.$1,
//       (RegExp.$1.length > 1
//         ? RegExp.$1.length > 2
//           ? '\u661f\u671f'
//           : '\u5468'
//         : '') + week[date.getDay() + '']
//     );
//   }
//   for (const k in o) {
//     if (new RegExp('(' + k + ')').test(fmt)) {
//       fmt = fmt.replace(
//         RegExp.$1,
//         RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
//       );
//     }
//   }
//   return fmt;
// }

// export function createLogger(namespace: string) {
//   const formatter = '[%l] %t: ';
//   const d = debug(namespace);
//   const methods = ['debug', 'log', 'info', 'warn', 'error'];
//   const colors: any = {
//     debug: '#9e9e9e',
//     log: '#80d8ff',
//     info: '#448aff',
//     warn: '#fbc02d',
//     error: '#ff3d00',
//   };
//   function f(m: string, name: string) {
//     const formated = formatter.replace(/(%\w{1})/g, (match, $1) => {
//       if ($1 === '%t') {
//         const now = new Date();
//         return chalk.hex(colors[name])(format(now));
//       }
//       if ($1 === '%l') {
//         return chalk.hex(colors[name])(name.toUpperCase());
//       }
//       return match;
//     });
//     d(formated + m);
//   }
//   const ret: any = {};
//   methods.forEach(e => {
//     ret[e] = (m: string) => {
//       f(m, e);
//     };
//   });
//   return ret;
// }

const colors: any = {
  TRACE: '#9e9e9e',
  DEBUG: '#80d8ff',
  INFO: '#448aff',
  WARN: '#fbc02d',
  ERROR: '#ff3d00',
};

prefix.reg(log);
log.enableAll();

prefix.apply(log, {
  format(level: string, name: string | undefined, timestamp: Date) {
    return `${chalk.gray(`[${timestamp}]`)} ${chalk.hex(
      colors[level.toUpperCase()]
    )(level)} ${chalk.green(`${name}:`)}`;
  },
});

prefix.apply(log.getLogger('critical'), {
  format(level: string, name: string | undefined, timestamp: Date) {
    return chalk.red.bold(`[${timestamp}] ${level} ${name}:`);
  },
});

export { log };
