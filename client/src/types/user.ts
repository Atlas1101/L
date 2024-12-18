export default interface User {
    userId: string; // From response._id

    userType: "volunteer" | "organization";
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
