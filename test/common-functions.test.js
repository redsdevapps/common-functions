import { expect } from '@open-wc/testing';

import { ObjectUtils } from '../index';

describe('ObjectUtils', () => {
  it('Not null', () => {
    expect(ObjectUtils.isObject).to.not.be.null;
  });
});
