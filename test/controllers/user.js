require.main.require('global');

var server = require(global.modulePath('app'));

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Controller: User', () => {
    /*
     * Test the /POST route
     */
    describe('/POST create: create a new user', () => {
        it('it should return token { Object (token) }', (done) => {
            var body = {
                firstname: "node",
                lastname: "testme",
                email: "node@testme.com",
                password: "abcdef",
                gender: "M"
            };
            chai.request(server)
                .post('/users')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    done();
                });
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET isDuplicateUsername: find out if username duplicates or not', () => {
        it('it should return true { Object (is) } if duplicated', (done) => {
            var username = "john@doe.com";
            chai.request(server)
                .get(`/users/duplicate/${username}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('is').eql(true);
                    done();
                });
        });

        it('it should return false { Object (is) } if not', (done) => {
            var username = "abc@def.com";
            chai.request(server)
                .get(`/users/duplicate/${username}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('is').eql(false);
                    done();
                });
        });
    });
});
