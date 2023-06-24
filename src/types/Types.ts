export type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
};
export type UsersWithExtraProperties = Users & {
  address: {
    city: string;
  };
  company: object;
  phone: string;
  website: string;
};
