# awesome-pubsub-js

[![NPM](https://img.shields.io/npm/v/awesome-pubsub-js.svg)](https://www.npmjs.com/package/awesome-pubsub-js) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

JavaScript implementation of the Publish/Subscribe pattern with TypeScript support.

# Install

### npm

```shell
$ npm install awesome-pubsub-js
```

### yarn
```shell
$ yarn add awesome-pubsub-js
```

# A quick example

Do you want to know more? Go to the [Documentation](#API) section

##### JavaScript:

```js
import PubSub from "awesome-pubsub-js";

const pubSub = PubSub();

pubSub.subscribe("event.example", (data) => {
    // data = { name: "John", email: "john@gmail.com" }
    // ... your logic
});

pubSub.publish("event.example", { name: "John", email: "john@gmail.com" });
```

### API
**List of all available methods:**

Each of the following methods takes one or two arguments

- Subscribe


| Method name | Payload | Return value |
| ------ | ------ | ------ |
| subscribe | ```pubSub.subscribe("eventName", (data) => {});```| HashKey (string) - is needed for use in the 'unsubscribe' method |
| unsubscribe | ```pubSub.unsubscribe('hashKey')``` <br /> hashKey (string) is always returned from the subscribe method | true - when the event has been successfully unsubscribed <br /> false - when the event does not exists | 
| publish | ```pubSub.publish('eventName', any)``` <br /> any = literally anything you want to pass :) <br /> If you don't pass anything, the default value will be undefined | true - when the event has published successfully <br /> false - when the event has not been published (e.g. due to the lack of a registered subscriber) | 
| getAllSubscribers |  - | returns the current subscription list |


### Roadmap:

- [x] subscribe and publish method
- [x] unsubscribe method
- [x] getAllSubscribers method
- [ ] Wildcard support
- [ ] Logger
    
