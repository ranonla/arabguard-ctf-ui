export type Bot = {
    id: string;
    name: string;
    description?: string;
    avatar: string;
    level: number;
    requiredTask: string;
    locked: boolean;
};