const redis = require('redis');
const bluebird = require('bluebird');

/* create redis client */
const client = redis.createClient();

/* promisify all redir callback function */
bluebird.promisifyAll(client);

module.exports = client;