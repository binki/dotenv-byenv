import * as assert from 'assert';
import {
  config,
} from 'dotenv-byenv';

config();

const expectedValue = process.argv[2];
assert.equal(process.env.X, expectedValue);
