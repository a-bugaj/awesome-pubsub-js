# awesome-pubsub-js

JavaScript implementation of the Publish/Subscribe pattern with TypeScript support.

# Install

### npm

```sh
$ npm install awesome-pubsub-js
```

### Example

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

##### TypeScript:

```ts
import PubSub from "awesome-pubsub-js";

const pubSub = PubSub();

interface Data {
    name: string;
    age: number;
}

const data: Data = { name: "John", age: 40 };

pubSub.subscribe<string, Data>("event.example", (data) => {
    // data = { name: "John", age: 40 }
    // ... your logic
});
pubSub.publish("event.example", data);

// or with enum

enum Event {
    Example: "event.example"
}

pubSub.subscribe<Event, Data>(Event.Example, data => {
    // data = { name: "John", age: 20 }
    // ... your logic
});
pubSub.publish<Event, Data>(Event.Example, data);

pubSub.subscribe<Event.Example, Data>(Event.Example, data => {});
pubSub.publish<Event.Example>(Event.Example, data);
```

### Documentation

TODO

### Roadmap:

TODO
