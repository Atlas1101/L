export interface UserState {
    userId: string; // From response._id
    username: string; // From response.username
    userType: "volunteer" | "organization";
}
