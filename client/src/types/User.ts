import Event from "./EventType";

export default interface User {
  userName: string;
  img: string;
  bio: string;
  email: string;
  phone: string;
  password: string;
  friends: string[];
  events: Event[];
  city: string;
  age: number;
}
