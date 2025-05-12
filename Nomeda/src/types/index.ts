export interface Message {
  text: string;
  isUser: boolean;
  imageUrl?: string;
  timestamp?: string;
  [x: string]: string | boolean | undefined;
}