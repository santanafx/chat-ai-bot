import { Message } from "ai";

export interface OutputAreaProps {
  isLoadingChat: boolean;
  messages: Message[];
  data: any;
}
