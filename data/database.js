const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  database = client.db('mystery-boxes');
}

function getDb() {
  if (!database) {
    throw new Error('Debe conectarse a la base de datos primero!');
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
};