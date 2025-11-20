import { User } from "./users";

export type Article = {
  id?: number;
  title: string;
  story: string;
  category: string;
  date?: string;
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

export type CommentProp = {
  id: number;
  comment: string;
  ownerId: string;
  postId: number;
  date: string;
  parentId: number;
  replies: CommentProp[];
};

export type Comments = {
  comments: CommentProp;
  users: User;
};
