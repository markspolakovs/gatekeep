/* eslint-disable */

import {spy} from 'sinon';

export default spy(function() {
  return {
    'TEST_SECRET_1': {
      sources: [
        this.env('TEST_SECRET_1')
      ]
    },
    'TEST_GENERATED_SECRET_2': {
      sources: [
        this.env('TEST_GENERATED_SECRET_2'),
        function() {
          return 'pretend this is random';
        }
      ]
    },
    'TEST_SECRET_3': {
      sources: [
        function() { return 'should be me!'; },
        this.env('SHOULD_NOT_BE_RETURNED')
      ]
    }
  };
});
