export type User = {
  id: string;
  name: string;
  imageUri: string;
};

export type Message = {
  id?: string;
  createdAt: number;
  text: string;
  user: string;
  type?: 'audio' | 'image' | 'video';
  source? : string;
};

export type Conversation = {
  id: string;
  user: User;
  lastMessage: string;
};

export type conversation = {
  id: string;
  lastMessage: Message;
  messages: Message[];
  mateName?: string;
  user?: string;
};
