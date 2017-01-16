require.main.require('global');

var server = require(global.modulePath('app'));

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Controller: Auth', () => {
    /*
     * Test the /POST route
     */
    describe('/POST authenticate: authenticate user', () => {
        it('it should return token { Object (token) } if successful', (done) => {
            var body = {
                username: "john@doe.com",
                password: "foobar"
            };
            chai.request(server)
                .post('/authenticate')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    done();
                });
        });

        it('it should return error { Object (message) } if username incorrect', (done) => {
            var body = {
                username: "abc@def.com",
                password: "foobar"
            };
            chai.request(server)
                .post('/authenticate')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Invalid user or password');
                    done();
                });
        });

        it('it should return error { Object (message) } if password incorrect', (done) => {
            var body = {
                username: "john@doe.com",
                password: "abcdef"
            };
            chai.request(server)
                .post('/authenticate')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Invalid user or password');
                    done();
                });
        });
    });
});
