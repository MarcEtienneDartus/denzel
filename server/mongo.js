const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb+srv://node:JMgWd42FvJTvgoru@cluster0-wykyq.azure.mongodb.net';
 
// Database Name
const dbName = 'Movies';
 
const MongoConnect = (callback) => {
  // Use connect method to connect to the server
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection(dbName);

    callback(collection);
  
    client.close();
  });
}

const Find = (query,callback) => {
  MongoConnect((collection)=>{
    collection.find(query).toArray((err, docs) => {
      assert.equal(err, null);
      callback(docs);
    });
  })
}

const Insert = (data,callback) => {
  MongoConnect((collection)=>{
    collection.insert(data)
    callback();
  })
}

const Update = (query,data,callback) => {
  MongoConnect((collection)=>{
    collection.update(query,data)
    .then((docs) => { 
      callback(docs); 
    })
    .catch((er)=> {
      assert.equal(err, null);
    })
  })
}

const RemoveAll = (callback) => {
  MongoConnect((collection)=>{
    collection.remove({})
    callback();
  })
}



module.exports = { Find, Insert, Update, RemoveAll };