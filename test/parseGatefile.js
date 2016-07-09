/* eslint-disable no-unused-expressions */

import 'babel-core/register';

import chai from 'chai/chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import testGatefileFunction from './Test.Gatefile';

const expect = chai.expect;
chai.use(sinonChai);

import {parseFile} from '../src/lib/parseGatefile';

describe('Gatefile parser', function() {
  const TEST_GATEFILE_PATH = '../../test/Test.Gatefile';

  it('should export a function called parseFile', function(done) {
    expect(parseFile).to.be.a('function');
    done();
  });

  it('should call the callback if a valid function is in the passed file', function(done) {
    const spy = sinon.spy();

    parseFile(TEST_GATEFILE_PATH, spy);

    expect(spy).to.have.been.called;

    done();
  });

  it('should execute the exported function in the file that is passed to it', function(done) {
    parseFile(TEST_GATEFILE_PATH, () => {
      expect(testGatefileFunction).to.have.been.called;
      done();
    });
  });

  it('should call the callback with the result of the passed file\'s function', function(done) {
    parseFile(TEST_GATEFILE_PATH, (config) => {
      expect(testGatefileFunction).to.have.been.called;
      expect(config).to.be.a('object');
      done();
    });
  });

});
