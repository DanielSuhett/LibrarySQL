const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => console.log('Redis client connected'))
client.on('error', (error) => console.log('Redis client error:\n' + error))


module.exports = client