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

### Writing the first API call to create something

Ok, now let's write an API call simulating creating something.

We will need underscore.

```
npm install underscore --save
```

Add the top of app.js, add the following.

```
var _ = require('underscore');
```

Add the following route.

```
server.route({
  method: '*',
  path: '/api/v0/users/create.json',
  handler: function (request, reply) {
    var payload = request.payload;
    var query = request.query;
    var params = {};
    params = _.extend(params, payload);
    params = _.extend(params, query);

    json = {
      users: [
        {
          id: 1,
          email: params.email
        }
      ]
    }

    reply(json);
  }
});
```

Cool. Now try that url in your browser. <http://localhost:8000/api/v0/users/create.json?email=mot@mot.la>.

Try changing the email. You will see the email result change.

Finally try as a POST request.

```
curl -X POST http://localhost:8000/api/v0/users/create.json -d "email=mot@mot.la"
```

### Add error handling to the create action

Now, let's add some error handling to make sure the human inputs an email when using the API.

```
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
```

Now, try that in your url, but this time try with the email blank. <http://localhost:8000/api/v0/users/create.json?email=>

See how you get the error response back. Good job. Next, try as a POST request using curl.


```
curl -X POST http://localhost:8000/api/v0/users/create.json -d "email=" -v
```

And as you can see in the verbose data that is printed back, you have a status code of 400.

Congratulations, you started writing your first human-first API. It will be predictable and easy for a human to consume. They can try it in their browser and then consume it in their code.


