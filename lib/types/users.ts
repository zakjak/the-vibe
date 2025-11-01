export type User = {
  id: string;
  email?: string | null;
  name?: string | null;
  isAdmin?: boolean | null;
  image?: string | null;
  emailVerified?: boolean;
};

export type Session = {
  user: User;
  userId: string;
};
