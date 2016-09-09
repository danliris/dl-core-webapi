var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var POTextile = require("dl-module").managers.po.POTextile;
var resultFormatter = require("../../../result-formatter");
const apiVersion = '1.0.0';
 
router.get("/v1/po/textiles/podl", (request, response, next) => {
    db.get().then(db => {
            var manager = new POTextile(db, {
                username: 'router'
            });

            var query = request.query;
            manager.readAllPurchaseOrderGroup(query)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
});

router.get('/v1/po/textiles/podl/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new POTextile(db, {
            username: 'router'
        });

        var id = request.params.id;

        manager.getPurchaseOrderGroupById(id)
            .then(doc => {
                var result = resultFormatter.ok(apiVersion, 200, doc);
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })

    })
});

router.post('/v1/po/textiles/podl', (request, response, next) => {
    db.get().then(db => {
        var manager = new POTextile(db, {
            username: 'router'
        });

        var data = request.body;

        manager.createGroup(data)
            .then(docId => {
                response.header('Location', `${docId.toString()}`);
                var result = resultFormatter.ok(apiVersion, 201);
                response.send(201, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })

    })
});

router.put('/v1/po/textiles/podl/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new POTextile(db, {
            username: 'router'
        });

        var id = request.params.id;
        var data = request.body;

        manager.updateGroup(data)
            .then(docId => {
                var result = resultFormatter.ok(apiVersion, 204);
                response.send(204, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })

    })
});

router.post('/v1/po/split/textiles', (request, response, next) => {
    db.get().then(db => {
        var manager = new POTextile(db, {
            username: 'router'
        });

        var data = request.body;

        manager.split(data)
            .then(docId => {
                response.header('Location', `${docId.toString()}`);
                var result = resultFormatter.ok(apiVersion, 201);
                response.send(201, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })

    })
});

router.get("/v1/po/textiles", (request, response, next) => {
    db.get().then(db => {
            var manager = new POTextile(db, {
                username: 'router'
            });

            var query = request.query;
            manager.read(query)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
})

router.get("/v1/po/textiles/nohaspodl", (request, response, next) => {
    db.get().then(db => {
            var manager = new POTextile(db, {
                username: 'router'
            });

            var query = request.query;
            manager.readPOnohasPODL(query)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
})

router.get("/v1/po/textiles/haspodl", (request, response, next) => {
    db.get().then(db => {
            var manager = new POTextile(db, {
                username: 'router'
            });

            var query = request.query;
            manager.readPOhasPODL(query)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
})

router.get('/v1/po/textiles/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new POTextile(db, {
            username: 'router'
        });

        var id = request.params.id;

        manager.getById(id)
            .then(doc => {
                var result = resultFormatter.ok(apiVersion, 200, doc);
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })

    })
});

router.post('/v1/po/textiles', (request, response, next) => {
    db.get().then(db => {
        var manager = new POTextile(db, {
            username: 'router'
        });

        var data = request.body;

        manager.create(data)
            .then(docId => {
                response.header('Location', `${docId.toString()}`);
                var result = resultFormatter.ok(apiVersion, 201);
                response.send(201, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })

    })
});

router.put('/v1/po/textiles/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new POTextile(db, {
            username: 'router'
        });

        var id = request.params.id;
        var data = request.body;

        manager.update(data)
            .then(docId => {
                var result = resultFormatter.ok(apiVersion, 204);
                response.send(204, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })

    })
});

router.del('/v1/po/textiles/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new POTextile(db, {
            username: 'router'
        });

        var id = request.params.id;
        var data = request.body;
 
        manager.delete(data)
            .then(docId => {
                var result = resultFormatter.ok(apiVersion, 204);
                response.send(204, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
    })
});

module.exports = router;
