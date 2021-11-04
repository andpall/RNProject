export type User = {
  id: string;
  name: string;
  imageUri: string;
};

export type Message = {
  createdAt: number;
  text: string;
  user: string;
  type?: 'audio' | 'image' | 'video';
  source?: string;
};

export type Conversation = {
  id: number;
  lastMessage: Message | null;
  messages: Message[];
  mateName?: string;
  user: string;
};

export type RootStackParamList = {
  LoginScreen: undefined;
  PhoneAuth: undefined;
  Home: undefined;
  MyChats: undefined;
  Chat: {
    documentName: string;
    myId: string;
    mateId: string;
    messages: Message[];
  };
};
