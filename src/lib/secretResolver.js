import {SecretUnresolvedError} from './errors';

export class SecretResolver {
  constructor(config = {}) {
    this.config = config;
    this.userOverrides = {};
  }

  setUserOverrides(overrides) {
    this.userOverrides = overrides;
  }

  __resolveSecret(name, secret) {
    if (this.userOverrides[name]) {
      return this.userOverrides[name];
    }

    for (const gen of secret.sources) {
      const resolved = this.__resolveGenerator(gen);
      if (resolved) {
        return resolved;
      }
    }
    return undefined;
  }

  __resolveGenerator(gen) {
    switch (typeof gen) {
      case 'function':
        {
          const secret = gen.call();
          if (secret) {
            return secret;
          }
          return undefined;

        }
      default:
        {
          if (gen) {
            return gen;
          }
          return undefined;
        }
    }
  }

  __getConfigBool(name) {
    return this.config.hasOwnProperty('resolver')
      && this.config.resolver.hasOwnProperty(name)
      && this.config.resolver[name];
  }

  resolve(secrets) {
    const result = {};
    for (const [name, sec] of Object.entries(secrets)) {
      const resolved = this.__resolveSecret(name, sec);
      if (resolved) {
        result[name] = resolved;
      } else if (this.__getConfigBool('throwOnUnresolved')) {
        throw new SecretUnresolvedError(`Could not resolve secret ${name}`);
      } else {
        result[name] = undefined;

      }
    }
    return result;
  }
}
