import 'babel-core/register';


import chai from 'chai/chai';
import sinonChai from 'sinon-chai';

const expect = chai.expect;
chai.use(sinonChai);

import {parseFile} from '../src/lib/parseGatefile';
import {SecretResolver} from '../src/lib/secretResolver';
import {SecretUnresolvedError} from '../src/lib/errors';

describe('Secret resolver', function() {
  const TEST_GATEFILE_PATH = '../../test/Test.Gatefile';
  it('resolves test secrets properly', function(done) {
    parseFile(TEST_GATEFILE_PATH, (config) => {
      const resolver = new SecretResolver();
      const resolved = resolver.resolve(config);
      expect(resolved).to.deep.equal({
        TEST_SECRET_1: undefined,
        TEST_GENERATED_SECRET_2: 'pretend this is random',
        TEST_SECRET_3: 'should be me!'
      });
      done();
    });
  });

  it('throws an error when a secret cannot be resolved (global setting)', function(done) {
    parseFile(TEST_GATEFILE_PATH, (config) => {
      const resolver = new SecretResolver({
        resolver: {
          throwOnUnresolved: true
        }
      });
      expect(resolver.resolve.bind(resolver, config)).to.throw(SecretUnresolvedError);
      done();
    });
  });

  it('resolves environment variables properly', function(done) {
    process.env.TEST_SECRET_1 = 'pass';
    process.env.TEST_GENERATED_SECRET_2 = 'pass';
    process.env.SHOULD_NOT_BE_RETURNED = 'fail';
    parseFile(TEST_GATEFILE_PATH, (config) => {
      const resolver = new SecretResolver();
      const resolved = resolver.resolve(config);
      expect(resolved).to.deep.equal({
        TEST_SECRET_1: 'pass',
        TEST_GENERATED_SECRET_2: 'pass',
        TEST_SECRET_3: 'should be me!'
      });
      delete process.env.TEST_SECRET_1;
      delete process.env.TEST_GENERATED_SECRET_2;
      delete process.env.SHOULD_NOT_BE_RETURNED;
      done();
    });
  });

  it('follows user overrides', function(done) {
    parseFile(TEST_GATEFILE_PATH, (config) => {
      const resolver = new SecretResolver();
      resolver.setUserOverrides({
        TEST_SECRET_1: 'pass',
        TEST_SECRET_3: 'pass'
      });
      const resolved = resolver.resolve(config);
      expect(resolved).to.deep.equal({
        TEST_SECRET_1: 'pass',
        TEST_GENERATED_SECRET_2: 'pretend this is random',
        TEST_SECRET_3: 'pass'
      });
      done();
    });
  });

});
