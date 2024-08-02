import axios from "axios";
import { IChat } from "../types/Message";

export const api = axios.create({ baseURL: import.meta.env.VITE_BASE_API_URL });

// CHATS
export const getChats = async (userID: string) => {
  try {
    return (await api.get(`/chat/${userID}`)).data;
  } catch (error) {
    console.error(error);
  }
};

export const createChat = async (body: Omit<IChat, "_id">) => {
  try {
    return (await api.post("/chat", body)).data;
  } catch (error) {
    console.error(error);
  }
};

export const updateChat = async (body: IChat) => {
  try {
    await api.put(`/chat/${body._id}`, body);
  } catch (error) {
    console.error(error);
  }
};

export const deleteChat = async (chatID: string) => {
  try {
    await api.delete(`/chat/${chatID}`);
  } catch (error) {
    console.error(error);
  }
};

// MESSAGES
export const getMessages = async (chatID: string) => {
  try {
    return (await api.get(`/message/${chatID}`)).data;
  } catch (error) {
    console.error(error);
  }
};
