'use strict';

const { expect } = require('chai');
const { center } = require('../lib/center.js');
describe ("function to center the month and year", () => {
  it('should center August 2016 over day list', function () {
    expect(center(7, 2016)).to.equal('     July 2016\nSu Mo Tu We Th Fr Sa\n"');
  });

});
