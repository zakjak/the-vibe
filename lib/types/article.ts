import { User } from "./users";

export type Article = {
  id: number;
  title: string;
  story: string;
  category: string;
  date: Date;
  author: string;
  image: string;
  imageCredit: string;
  images: string[];
  authorId: number;
  tags: string[];
};

export type Articles = {
  articles: Article[];
};

export type Comment = {
  id: number;
  comment: string;
  ownerId: string;
  postId: number;
  date: Date;
};

export type Comments = {
  comments: Comment;
  users: User;
};
