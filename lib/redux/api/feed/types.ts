export interface IFeedPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  username: string;
}

export interface IUser {
  id: number;
  username: string;
}