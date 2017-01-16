require.main.require('global');

var passwordHash = require(global.modulePath('password-hash','helper'));

var chai = require('chai');
var expect = chai.expect;

describe('Helper: PasswordHash', () => {
    describe('genSalt: generate salt', () => {
        it('it should return 16-length hexadecimal value', () => {
            const REGEXP = /^[0-9A-Fa-f]{16}$/;

            expect(REGEXP.test(passwordHash.genSalt())).to.equal(true);
        });
    });

    describe('hash: hash password + salt', () => {
        it('it should return 64-length hexadecimal value', () => {
            const REGEXP = /^[0-9A-Fa-f]{64}$/;
            var password = "abc123";
            var salt = passwordHash.genSalt();

            expect(REGEXP.test(passwordHash.hash(password, salt))).to.equal(true);
        });
    });
});
