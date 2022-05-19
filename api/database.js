
const env = require('./config');
const { dbUsername, dbPassword } = require('./config');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri= `mongodb+srv://${dbUsername}:${dbPassword}@nodejsdatabase.mtnzw.mongodb.net/nodejsDatabase?retryWrites=true&w=majority`

const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
});
module.exports = client;
