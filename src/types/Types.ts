export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
};
export type UserWithExtraProperties = User & {
  address: {
    city: string;
  };
  company: object;
  phone: string;
  website: string;
};
