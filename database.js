
const env = require('./config');
const { dbUsername, dbPassword } = require('./config');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri= `mongodb+srv://${dbUsername}j:${dbPassword}@nodejsdatabase.mtnzw.mongodb.net/nodejsDatabase?retryWrites=true&w=majority`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("nodejsDatabase").collection("Users");
    console.log(collection)
    try {
        collection.insertOne( { item: "card", qty: 15 } );
    } catch {
        throw(err)
    }
    console.log('connected')
});

module.exports = client;
