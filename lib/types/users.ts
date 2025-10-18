export type User = {
  id: string;
  email?: string;
  name?: string;
  image?: string | null;
  isAdmin?: boolean;
  profilePicture?: string;
  emailVerified?: boolean;
};

export type Session = {
  user: User;
  userId: string;
};
