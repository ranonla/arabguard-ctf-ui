export type Bot = {
    id: string;
    persona: string;
    persona_desc: string;
    avatar: string;
    level: number;
    status: "ACTIVE" | "COMPLETED" | "LOCKED";
    target: string,
};