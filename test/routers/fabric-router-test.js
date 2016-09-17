var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var Fabric = require('dl-models').core.Fabric;
    var Uom = require('dl-models').core.Uom; 

    var fabric = new Fabric();
    
    var uom = new Uom({
        unit: 'Meter'
    });
    
    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    fabric.code = code;
    fabric.name = `name[${code}]`;
    fabric.price = 500;
    fabric.description = `desc for ${code}`;
    fabric.composition = `composition [${code}]`;
    fabric.construction = `construction [${code}]`;
    fabric.thread = `thread [${code}]`;
    fabric.width = 0;
    fabric.uom = uom;
    return fabric;
}
it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/core/fabrics')
        .expect(200)
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property('data');
                result.data.should.instanceOf(Array);
                done();
            }
        });
})

it('#02. should success when create new data', function (done) {
    var data = getData();
    request(uri).post('/v1/core/fabrics')
        .send(data)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();

            }
        });

});

var createdData;

it(`#03. should success when update created data`, function (done) {
    request(uri).put('/v1/core/buyers')
        .send({ name: 'test_name', code: 'test_code' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});

var createdId;
it("#04. should success when delete data", function (done) {
    request(uri).del('/v1/core/buyers/:id')
        .query({ _id: createdId })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});
