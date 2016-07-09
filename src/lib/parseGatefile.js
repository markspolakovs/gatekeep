import process from 'process';

const configFunctionEnv = {
  env: function(envName) {
    return function() {
      return process.env[envName];
    };
  }
};

export function parseFile(filePath, callback) {
  const configFunction = require(filePath).default;
  const config = configFunction.call(configFunctionEnv, null);

  callback(config);
}

