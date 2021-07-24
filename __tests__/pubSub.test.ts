import PubSub, { PubSubInterface } from "../lib";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => {};

describe("PubSub -> Default Instance", () => {
    let pubSub: PubSubInterface;

    beforeEach(() => {
        pubSub = PubSub();
    });

    it("Should create pubSub instance with subscribers field set to empty array", () => {
        expect(pubSub.getAllSubscribers()).toEqual([]);
    });
});

describe("PubSub -> Subscribe Method", () => {
    let pubSub: PubSubInterface;

    beforeEach(() => {
        pubSub = PubSub();
    });

    it("Should add event to subscribers array with generated hash key and passed callback ", () => {
        // given
        const event = "random.event";

        // when
        const hashKey = pubSub.subscribe(event, noop);

        // then
        const events = pubSub.getAllSubscribers();

        expect(events).toEqual(
            expect.arrayContaining([
                {
                    eventName: event,
                    hashKey,
                    callback: noop,
                },
            ])
        );
    });

    it("Should call the subscribe method twice if someone subscribed to one event twice", () => {
        // given
        const event = "my.event";

        const dataEvent1 = "random string";

        const callbackEvent = jest.fn();
        const callbackEvent2 = jest.fn();

        // when
        pubSub.subscribe(event, callbackEvent);
        pubSub.subscribe(event, callbackEvent2);

        pubSub.publish(event, dataEvent1);

        // then
        expect(pubSub.getAllSubscribers()).toHaveLength(2);

        expect(callbackEvent).toHaveBeenCalledTimes(1);
        expect(callbackEvent).toHaveBeenCalledWith(dataEvent1);

        expect(callbackEvent2).toHaveBeenCalledTimes(1);
        expect(callbackEvent).toHaveBeenCalledWith(dataEvent1);
    });

    it("Should return hashKey from subscribe method", () => {
        // given
        const event = "hash.key.event";

        // when
        const hashKey = pubSub.subscribe(event, noop);

        // then
        expect(typeof hashKey).toBe("string");
    });
});

describe("PubSub -> Unsubscribe Method", () => {
    let pubSub: PubSubInterface;

    beforeEach(() => {
        pubSub = PubSub();
    });

    it("Should remove event from the subscribers array after unsubscribe", () => {
        // given
        const event = "unsubscribe.event";

        // when
        const hashKey = pubSub.subscribe(event, noop);
        const events = pubSub.getAllSubscribers();
        expect(events).toHaveLength(1);

        // then
        pubSub.unsubscribe(hashKey);
        const eventsAfterUnsubscribe = pubSub.getAllSubscribers();
        expect(eventsAfterUnsubscribe).toHaveLength(0);
    });

    it("Should delete a specific event if there are two events with the same name in the subscribers array", () => {
        // given
        const event = "random.event";
        const callback = jest.fn();

        // when
        const hashKey1 = pubSub.subscribe(event, callback);
        const hashKey2 = pubSub.subscribe(event, callback);
        const [firstEvent, secondEvent] = pubSub.getAllSubscribers();

        // then
        expect(firstEvent).toEqual({
            eventName: event,
            callback,
            hashKey: hashKey1,
        });

        expect(secondEvent).toEqual({
            eventName: event,
            callback,
            hashKey: hashKey2,
        });

        pubSub.unsubscribe(hashKey2);

        const [eventAfterUnsubscribe] = pubSub.getAllSubscribers();
        expect(eventAfterUnsubscribe).toEqual({
            eventName: event,
            callback,
            hashKey: hashKey1,
        });
    });
});

describe("PubSub -> Publish method", () => {
    let pubSub: PubSubInterface;
    const data = {
        name: "John",
        age: 50,
    };

    beforeEach(() => {
        pubSub = PubSub();
    });

    it("Should publish event with passed data", () => {
        // given
        const event = "random.event";
        const callback = jest.fn();

        // when
        pubSub.subscribe(event, callback);
        expect(callback).toHaveBeenCalledTimes(0);
        pubSub.publish(event, data);

        // then
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(data);
    });

    it("Should publish event twice when someone publishing the event twice", () => {
        // given
        const event = "nice.event!";
        const callback = jest.fn();
        pubSub.subscribe(event, callback);

        // when
        pubSub.publish(event, data);
        pubSub.publish(event, []);

        // then
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenNthCalledWith(1, data);
        expect(callback).toHaveBeenNthCalledWith(2, []);
    });
});
