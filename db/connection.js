const { Client } = require('pg');
const client = new Client({
  connectionString: 'your_postgresql_connection_string_here',
});

client.connect();

module.exports = client;
