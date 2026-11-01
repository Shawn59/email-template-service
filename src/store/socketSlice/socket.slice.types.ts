import { IUserModel } from '../../types/user';

export interface IMessageFile {
  name: string;
  type: string;
  size: number;
  buffer: string | ArrayBuffer;
}

export interface IMessage {
  id: string;
  text: string;
  user: IUserModel;
  senderId: string | undefined;
  timestamp: string;
  link?: string;
  file?: IMessageFile;
}

export interface ISocketData {
  connected: boolean;
  senderId: string;
  messages: IMessage[];
}
