import Comment from "./Comment";

export default interface Event {
  id: string;
  evName: String;
  images: string[];
  details: String;
  volunteers: String[];
  capacity: number;
  comments: Comment[];
  address: String;
  location: String;
  organization: String;
  status: "open" | "closed" | "expired";
  tags: string[];
  hours: number;
  startTime: Date;
  endTime: Date;
  users: string[];
}
