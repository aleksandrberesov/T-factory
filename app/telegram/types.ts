export interface ITelegramUser {
    id: number;
    user: {
      first_name: string;
      last_name?: string;    
    };
    username: string;
    language_code: string;
  };