import { TUser } from "../models/types"

export interface ITelegramUser {
    id: number;
    user: TUser;
    username: string;
    language_code: string;
  }