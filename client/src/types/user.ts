// user
export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  bio?: string;
  img?: string;
  age: number;
  events: string[];
  friends: string[];
}

//   org
export interface Organization {
  _id: string;
  orgName: string;
  email: string;
  phone: string;
  city: string;
  about?: string;
  images?: string[];
  events: string[];
}

// type
export type UserOrOrganization = User | Organization;
