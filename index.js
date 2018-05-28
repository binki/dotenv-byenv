'use strict';

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// This function is intentionally written idempotently. It should not
// hurt to run multiple times.
//
// This function is intentionally synchronous because it will likely
// be run prior to module imports and aims to be compatible with the
// function of the same name from dotenv.
module.exports.config = function (options) {
  // The default value of NODE_ENV should be development. It can only
  // be overridden by setting a system environment
  // variable. Otherwise, we have the chicken-egg problem of loading
  // .env and .env.local to discover NODE_ENV (in case it’s set
  // there). That seems like iffy behavior, so just get it straight
  // from the system.
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }

  const dotenvOptions = {};
  let basePath = process.cwd();
  if (options) {
    for (const key of Object.keys(options)) {
      switch (key) {
      case 'encoding':
        // We support this and pass it through.
        dotenvOptions.encoding = options.encoding;
        break;
      case 'path':
        // We treat this as a directory path and do not pass to
        // dotenv.
        basePath = options.path;
        break;
      default:
        throw new Error('Unrecognized option key: ' + key);
      }
    }
  }

  for (const environmentSuffix of [
    '.' + process.env.NODE_ENV,
    '',
  ]) {
    for (const localSuffix of [
      '.local',
      '',
    ]) {
      const dotenvPath = dotenvOptions.path = path.join(basePath, '.env' + environmentSuffix + localSuffix);
      if (fs.existsSync(dotenvPath)) {
        dotenv.config(dotenvOptions);
      }
    }
  }
};
