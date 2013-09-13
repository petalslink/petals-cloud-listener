# Events Listener

JSON events listener with MongoDB storage and live display (powered by socket.io).

## Howto

Grab the code:

    git clone https://github.com/petalslink/petals-cloud-listener.git
    npm install

Starting the server:

This assumes that mongoDB is already started and configured in config/config.js

    npm start
    open http://localhost:3000

## Configure

Check the config/config.js file and adapt it to your needs...

## API

HTTP Post JSON data to http://localhost:3000/events with format:

    {
      'event_id' : 'XXX',
      'step' : 'a step in . format = foo.bar.baz',
      'message' : 'The log message',
      'group' : 'my-group-001'
    }

Note: JSON payload is not strict: You can post whatever JSON payload you want to the events resource.
It will be handled by the system without any problem.

## Features

- Live display of received events with socket.io
- Events are stored with mongodb
- Group events with 'group' parameter: Events will be displayed accordingly...
- Group page is displaying new events of the group dynamically
- ...

## Deploying

### Heroku

This assumes that you already have an Heroku account... Heroku is used to deploy and run the nodejs part of the application.
The mongo part is handled with the help of Heroku add-ons has explained at https://addons.heroku.com.

Let's go:

    # Clone this repo
    git clone https://github.com/petalslink/petals-cloud-listener.git

    # deploy your app
    heroku create MYAPP_NAME

In order to keep the application awake on Heroku, you will have adapt config/config.js and set an the HEARTBEAT_URL env like this:

    heroku config:add HEARTBEAT_URL=http://MYAPP_NAME.herokuapp.com/heartbeat

Configure mongodb:

    # Add mongolab add-on
    heroku addons:add mongolab

    # get the MONGOLAB_URI
    heroku config:set -a MYAPP_NAME | grep MONGOLAB_URI`

    # Push the application to heroku remote will deploy it on http://MYAPP_NAME.herokuapp.com
    git push heroku master

Note: You can check env variables with

    heroku config

![Group listing](http://f.cl.ly/items/082j0x2V34381v0w3p0J/cloudlistener-group.png)

## License

(The MIT License)

Copyright (c) 2013 Christophe Hamerling &lt;chamerling@linagora.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.