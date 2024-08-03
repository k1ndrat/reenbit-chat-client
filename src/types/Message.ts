export interface IMessage {
  author: string;
  bot_name: string;
  bot_surname: string;
  chatID: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
}

export interface IChat {
  _id: string;
  userID: string;
  bot_name: string;
  bot_surname: string;
  last_message?: IMessage;
  createdAt: string;
}
