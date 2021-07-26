import { randomHashKeyGenerator, HashKey } from "./randomHashKeyGenerator";

type Callback<D = unknown> = (data?: D) => void;

interface Subscribers {
    eventName: string;
    hashKey: HashKey;
    callback: Callback<any>;
}

export class PubSub {
    private subscribers: Subscribers[];

    constructor() {
        this.subscribers = [];
    }

    subscribe = <E extends string, D = (data?: unknown) => void>(
        event: E,
        callback: Callback<D>
    ): HashKey => {
        const hashKey = randomHashKeyGenerator();

        this.subscribers.push({
            eventName: event,
            hashKey,
            callback,
        });

        // return hashkey for unsubscribe method
        return hashKey;
    };

    unsubscribe = (hashKey: HashKey): void => {
        if (!hashKey) return;

        const events = this.subscribers.filter((subscriber) => subscriber.hashKey !== hashKey);

        this.subscribers = events;
    };

    publish = <E extends string, D = unknown>(event: E, data?: D): void => {
        const events = this.subscribers.filter(({ eventName }) => eventName === event);

        events.forEach((event) => {
            event.callback(data);
        });
    };

    getAllSubscribers = (): Subscribers[] => this.subscribers;
}
