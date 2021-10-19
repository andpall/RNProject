export type User = {
  id: string;
  name: string;
  imageUri: string;
};

export type Message = {
  id: string;
  content: string;
  user: User;
};

export type Conversation = {
  id: string;
  user: User;
  lastMessage: string;
};
