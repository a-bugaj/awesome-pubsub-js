import { PubSub as PubSubInstance } from "./pubSub";

export type PubSubInterface = Omit<PubSubInstance, "subscribers">;

const PubSub = (): PubSubInterface => {
    const pubSub = new PubSubInstance();

    return {
        subscribe: pubSub.subscribe,
        unsubscribe: pubSub.unsubscribe,
        publish: pubSub.publish,
        getAllSubscribers: pubSub.getAllSubscribers,
    };
};

export default PubSub;
