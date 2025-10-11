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
