# human-first-example

Example of building an application with a human first API approach.

## Tutorial

### Setting up example

```
mkdir human-first-example
cd human-first-example
vim README.md
```

Install hapi

```
npm init
npm install hapi --save
```

Add app.js

```
vim app.js
```

Copy and paste the following.

```
var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server('localhost', 8000);

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {
    reply('hello world');
  }
});

// Start the server
server.start();
```

Try running it.

```
node app.js
```

Then visit <http://localhost:8000/hello>. You will see 'hello world'.

### Writing the first API call

Edit the app.js file /hello call to this.

```
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
```

Then visit <http://localhost:8000/api/v0/users/list.json>.

You can also curl it as a POST request.

```
curl -X POST http://localhost:8000/api/v0/users/list.json>.
```
