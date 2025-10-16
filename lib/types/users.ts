type User = {
  id: string;
  email: string;
  isAdmin: boolean;
  name: string;
  profilePicture: string;
};

export type Session = {
  user: User;
  userId: string;
};
