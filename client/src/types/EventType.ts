import Comment from "./Comment";

export default interface Event {
    id: string;
    evName: string;
    images: string[];
    details: string;
    volunteers: string;
    [];
    capacity: number;
    comments: Comment[];
    address: string;
    location: string;
    organization: string;
    status: "open" | "closed" | "expired";
    tags: string[];
    hours: number;
    startTime: Date;
    endTime: Date;
    users: string[];
}
