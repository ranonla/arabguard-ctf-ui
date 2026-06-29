export type Message = {
  id: string;
  content: string;
  role: "user" | "system";
  // isOwn: boolean;
  // senderName?: string;
  // senderId: string;
  // sentAt: number;
}