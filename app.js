var _ = require('underscore');
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

server.route({
  method: '*',
  path: '/api/v0/users/create.json',
  handler: function (request, reply) {
    var payload = request.payload;
    var query = request.query;
    var params = {};
    params = _.extend(params, payload);
    params = _.extend(params, query);

    if (params.email) {
      var json = {
        users: [
          {
            id: 1,
            email: params.email
          }
        ]
      }
      reply(json);
    } else {
      var json = {
        errors: [
          {
            code: "required",
            field: "email",
            message: "email cannot be blank"
          }
        ]
      }
      reply(json).code(400);
    }
  }
});

// Start the server
server.start();
