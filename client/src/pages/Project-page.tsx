import Comment from "../types/Comment";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const proj = {
  id: "0987654321",
  evName: "fund raising",
  images: [
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/newscms/2019_06/2746941/190208-stock-money-fanned-out-ew-317p.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKOHPJFPMwEsWNHkRbx9bWa-J4bDJATQMbPQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvx7NfXARxLcbi3hBHrfgs60deLBlcJXT-WA&s",
    "https://www.shutterstock.com/shutterstock/photos/2514417351/display_1500/stock-photo-traditional-money-bag-for-storage-and-security-2514417351.jpg",
  ],
  details: "We want your money",
  volunteers: [],
  capacity: 100,
  comments: Comment[] =[],
  address: "Tel-Aviv",
  location: "",
  organization: "Microsoft",
  status: "expired",
  tags: ["money", "beingLame", "takingMoney", "greedy"],
  startTime: new Date(),
  endTime: new Date(),
  hours: 1,
  users: [],
};

export default function ProjectPage() {
  let statusElement = {
    styles: "",
    textContent: "",
  };
  switch (proj.status) {
    case "open":
      statusElement.styles = "";
      statusElement.textContent = "Join Now!";
      break;
    case "closed":
      statusElement.styles = "";
      statusElement.textContent = "This event is closed. Thank you!";
      break;
    case "expired":
      statusElement.styles = "";
      statusElement.textContent = "This event already happened";
      break;
  }

  return (
    <>
      <div className="flex flex-col">
        <span className="title ">{proj.evName}</span> <br />
        <span className="organization ">{proj.organization}</span>
        <span></span>
        <img src={proj.images[2]} alt="" />
        <button>share</button>
        <button className={`${statusElement.styles}`}>
          {statusElement.textContent}
        </button>
      </div>
    </>
  );
}
