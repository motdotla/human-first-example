var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server('localhost', 8000);

server.route({
  method: '*',
  path: '/api/v0/users/list.json',
  handler: function (request, reply) {
    json = {
      users: [
        {
          id: 1,
          email: 'mot@mot.la'
        },
        {
          id: 2,
          email: 'mot@sendgrid.com',
        }
      ]
    }

    reply(json);
  }
});

// Start the server
server.start();
