import CommentType from "@/types/Comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const comment: CommentType = {
  user: {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFkEsRyR0ilMDHtkOisWDFPiHm23Yw8iNfw&s",
    username: "Yehonatan Hatatim",
  },
  rating: 1,
  comContect: "Microsoft saved my mom life. i own the, my life",
};

export default function Comment() {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < comment.rating) {
      stars.push("../../public/star.fill.png");
    } else {
      stars.push("../../public/star.png");
    }
  }
  return (
    <>
      <div className="border border-black flex">
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage src={comment.user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-bold">{comment.user.username}</span>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-start gap-6 justify-center my-3">
            {stars.map((star, index) => (
              <img src={star} key={index} />
            ))}
          </div>
          <span className="mx-3">"{comment.comContect}"</span>
        </div>
      </div>
    </>
  );
}
