import {Hour} from './hour';
import {expect} from 'chai';
import 'mocha';

describe('Hour class tests', () => {
    it('Should works with AM times', () => {
        const hour = new Hour('10:02 AM');
        expect(hour.getHours()).to.equal(10);
        expect(hour.getMinutes()).to.equal(2);
    });

    it('Should works with PM times', () => {
        const hour = new Hour('02:05 PM');
        expect(hour.getHours()).to.equal(14);
        expect(hour.getMinutes()).to.equal(5);
    });

    it('Should not work with 24h format string', () => {
        expect(() => {
            const hour = new Hour('14:40');
        }).to.throw('Invalid hour 14:40');
    });

    it('Should not work with non valid time strings', () => {
        expect(() => {
            const hour = new Hour('2020-01-01 10:02:23');
        }).to.throw('2020-01-01 10:02:23');
    });
});
