export type HashKey = string;

export const randomHashKeyGenerator = (): HashKey => {
    return Math.random().toString(36).substr(2, 9);
};
