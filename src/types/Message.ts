export interface IMessage {
  author: string;
  bot: string;
  chatID: string;
  message: string;
  createdAt: string;
}

export interface IChat {
  _id: string;
  userID: string;
  bot_name: string;
  bot_surname: string;
}
