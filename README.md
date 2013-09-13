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