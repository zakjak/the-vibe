import { User } from "./users";

export type Article = {
  id?: number;
  title: string;
  story: string;
  category: string;
  date?: Date;
  authors: string[];
  image: string;
  imageTitle: string;
  imageCredit: string;
  images: string[];
  imagesTitle: string[];
  tags: string[];
};

export type Articles = {
  articles: Article[];
  users: User;
};

export type Comment = {
  id: number;
  comment: string;
  ownerId: string;
  postId: number;
  date: string;
};

export type Comments = {
  comments: Comment;
  users: User;
};
