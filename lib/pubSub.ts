import { randomHashKeyGenerator, HashKey } from "./randomHashKeyGenerator";

type Callback<D = unknown> = (data?: D) => void;

interface Subscribers {
    eventName: string;
    hashKey: HashKey;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: Callback<any>;
}

export class PubSub {
    private subscribers: Subscribers[];

    constructor() {
        this.subscribers = [];
    }

    subscribe = <E extends string, D = undefined>(
        event: E,
        callback: (data: D extends undefined ? void : D) => void
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

    unsubscribe = (hashKey: HashKey): boolean => {
        if (!hashKey) return false;

        const isExists = this.subscribers.find(
            ({ hashKey: subHashKey }) => subHashKey === hashKey
        );

        if (!isExists) return false;

        const events = this.subscribers.filter((subscriber) => subscriber.hashKey !== hashKey);
        this.subscribers = events;

        return true;
    };

    publish = <E extends string, D = unknown>(event: E, data?: D): boolean => {
        const events = this.subscribers.filter(({ eventName }) => eventName === event);

        if (events.length === 0) return false;

        events.forEach((event) => {
            event.callback(data);
        });

        return true;
    };

    getAllSubscribers = (): Subscribers[] => this.subscribers;
}
