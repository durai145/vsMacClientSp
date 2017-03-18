var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

var db = new Db('test', new Server('localhost', 27017));
// Establish connection to db
db.open(function(err, db) {
  assert.equal(null, err);

  // Get a second db
  var secondDb = db.db('integration_tests_2');

  // Create a dereference example
  secondDb.createCollection('test_deref_examples', function(err, collection) {

    // Insert a document in the collection
    collection.insert({'a':1}, {w:1}, function(err, ids) {

      // Let's build a db reference and resolve it
      var dbRef = new DBRef('test_deref_examples', ids[0]._id, 'integration_tests_2');

      // Resolve it including a db resolve
      db.dereference(dbRef, function(err, item) {
        assert.equal(1, item.a);

        // Let's build a db reference and resolve it
        var dbRef = new DBRef('test_deref_examples', ids[0]._id);

        // Simple local resolve
        secondDb.dereference(dbRef, function(err, item) {
          assert.equal(1, item.a);

          db.close();
        });
      });
    });
  });
});

