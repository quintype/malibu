const backend = require("quintype-backend");
const Client = backend.Client;
const config = require("./publisher-config");

const client = new Client(config.sketches_host);

client.client = client;
client.Story = backend.Story;
module.exports = client
