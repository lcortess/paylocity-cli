import {Today} from "./today";
import {expect} from "chai";
import 'mocha';

describe('Today class tests.', () => {

    const assertions = [
        {clockIn: '01:00 AM', expected: '01:00'},
        {clockIn: '06:22 AM', expected: '06:22'},
        {clockIn: '11:59 AM', expected: '11:59'},
        {clockIn: '11:59 PM', expected: '23:59'},
        {clockIn: '06:35 PM', expected: '18:35'},
    ];

    assertions.forEach(({clockIn, expected}) => {
        describe(`When called with ${clockIn} `, () => {
            it(`Should return ${expected}`, () => {
                const today = new Today(clockIn);
                const instance = today.getClockInHour();
                expect(instance).to.equal(expected);
            });
        })
    });

});
