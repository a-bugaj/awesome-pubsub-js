import PubSub from "../lib";

enum Event {
    Random = "event.random",
}

interface Data {
    name: string;
}

const pubSub = PubSub();

// publish method
pubSub.publish<Event, Data>(Event.Random, { name: "John" });
pubSub.publish<Event.Random, Data>(Event.Random, { name: "John" });
pubSub.publish<string, Data>("event.with.string.type.and.payload", { name: "John" });
pubSub.publish<string>("event.with.string.type", { name: "John" });
pubSub.publish("event.without.types", []);

// subscribe method
pubSub.subscribe<Event, Data>(Event.Random, (data) => {
    data.name;
});

pubSub.subscribe<Event>(Event.Random, () => {
    // empty payload
});

pubSub.subscribe<Event.Random, Data>(Event.Random, (data) => {
    data.name;
});
