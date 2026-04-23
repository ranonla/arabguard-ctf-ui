export type Message = {
  id: string;
  prompt: string;
  isOwn: boolean;
  senderName?: string;
  senderId: string;
  sentAt: number;
}