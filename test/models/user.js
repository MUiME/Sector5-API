require.main.require('global');

var userRepositiry = require(global.modulePath('user','repo:structured'));
var models = require(global.modulePath('', 'model:structured'));
var sequelize = models.sequelize;
var UserAccount = models.UserAccount;
var UserInfo = models.UserInfo;

var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Model: User', () => {
    describe('authenticate: authenticate user', () => {
        beforeEach(() => {
            sinon.spy(UserAccount, 'findOne');
            sinon.spy(UserInfo, 'findOne');
        });

        afterEach(() => {
            UserAccount.findOne.restore();
            UserInfo.findOne.restore();
        });

        it('it should return profile { Object (id, username, password, ... ) } if successful', () => {
            var username = "john@doe.com";
            var password = "foobar";

            return userRepositiry.authenticate(username, password).then((profile) => {
                expect(UserAccount.findOne).to.have.been.called;

                expect(UserInfo.findOne).to.have.been.called;

                expect(profile).to.be.an('object');
                expect(profile).to.have.property('id');
                expect(profile).to.have.property('username').eql(username);
                expect(profile).to.have.property('password').eql(password);
                expect(profile).to.have.property('first_name');
                expect(profile).to.have.property('last_name');
                expect(profile).to.have.property('email');
                expect(profile).to.have.property('gender');
            });
        });

        it('it should return undefined if username incorrect', () => {
            var username = "abc@def.com";
            var password = "foobar";

            return userRepositiry.authenticate(username, password).then((profile) => {
                expect(UserAccount.findOne).to.have.been.called;

                expect(profile).to.be.an('undefined');
            });
        });

        it('it should return undefined if password incorrect', () => {
            var username = "john@doe.com";
            var password = "abcdef";

            return userRepositiry.authenticate(username, password).then((profile) => {
                expect(UserAccount.findOne).to.have.been.called;

                expect(UserInfo.findOne).to.have.not.been.called;

                expect(profile).to.be.an('undefined');
            });
        });
    });

    describe('create: create a new user', () => {
        beforeEach(() => {
            sinon.spy(sequelize, 'transaction');
            sinon.spy(UserAccount, 'create');
            sinon.spy(UserInfo, 'create');
        });

        afterEach(() => {
            sequelize.transaction.restore();
            UserAccount.create.restore();
            UserInfo.create.restore();
        });

        it('it should return profile { Object (id, username, password, ... ) }', () => {
            var data = {
                username: "node@testme.com",
                password: "abcdef",
                first_name: "Node",
                last_name: "Testme",
                email: "node@testme.com",
                gender: "M"
            };

            return userRepositiry.create(data).then((profile) => {
                expect(sequelize.transaction).to.have.been.called;

                expect(UserAccount.create).to.have.been.called;

                expect(UserInfo.create).to.have.been.called;

                expect(profile).to.be.an('object');
                expect(profile).to.have.property('id');
                expect(profile).to.have.property('username').eql(data.username);
                expect(profile).to.have.property('password').eql(data.password);
                expect(profile).to.have.property('first_name').eql(data.first_name);
                expect(profile).to.have.property('last_name').eql(data.last_name);
                expect(profile).to.have.property('email').eql(data.email);
                expect(profile).to.have.property('gender').eql(data.gender);
            });
        });
    });

    describe('isDuplicateUsername: find out if username duplicates or not', () => {
        it('it should return true if duplicated', () => {
            var username = "john@doe.com";

            return expect(userRepositiry.isDuplicateUsername(username)).to.eventually.equal(true);
        });

        it('it should return false if not', () => {
            var username = "abc@def.com";

            return expect(userRepositiry.isDuplicateUsername(username)).to.eventually.equal(false);
        });
    });
});
