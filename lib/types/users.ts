export type User = {
  id: string;
  email?: string;
  name?: string;
  isAdmin?: boolean;
  image?: string;
  emailVerified?: boolean;
};

export type Session = {
  user: User;
  userId: string;
};
