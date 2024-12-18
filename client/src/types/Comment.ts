export default interface CommentType {
  user: {
    image: string;
    username: string;
  };
  rating: 1 | 2 | 3 | 4 | 5;
  comContect: string;
}
