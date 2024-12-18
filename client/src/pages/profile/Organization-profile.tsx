import EventViewCard from "@/components/Event-view-card";
import Event from "@/types/EventType";

interface Organization {
  orgName: String;
  about: String;
  events: Event[];
  email: String;
  phone: String;
  images: string[];
  city: String;
  createdAt: Date;
}

const Amutah: Organization = {
  orgName: "Microsoft",
  about:
    "A non-profit organization dedicated to community support and development.",
  events: [
    {
      id: "0987654321",
      evName: "fund raising",
      images: [
        "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/newscms/2019_06/2746941/190208-stock-money-fanned-out-ew-317p.jpg",
      ],
      details: "We want your money",
      volunteers: [],
      capacity: 100,
      comments: [{ rating: 3 }, { rating: 5 }],
      address: "Tel-Aviv",
      location: "",
      organization: "Microsoft",
      status: "open",
      tags: ["money", "beingLame", "takingMoney", "greedy"],
      startTime: new Date(),
      endTime: new Date(),
      hours: 1,
      users: [],
    },
    {
      id: "09876543211",
      evName: "fund raising",
      images: [
        "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/newscms/2019_06/2746941/190208-stock-money-fanned-out-ew-317p.jpg",
      ],
      details: "We want your money",
      volunteers: [],
      capacity: 20,
      comments: [{ rating: 3 }, { rating: 5 }],
      address: "Tel-Aviv",
      location: "",
      organization: "Microsoft",
      status: "open",
      tags: ["money", "beingLame", "takingMoney"],
      startTime: new Date(),
      endTime: new Date(),
      hours: 1,
      users: [],
    },
  ],
  email: "microsift@microsoft.org",
  phone: "+972501234567",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8u8BZcgcIxcfgSJsas_HDf2pfYTBlmo2q3g&s",
    "https://external-preview.redd.it/uhq5zTcMPM3tOW_fbUz4PayDt_5pkEXdyXXoRWs3XOg.jpg?auto=webp&s=e06461124c1ccfdba7e9ece763b644ff68eeb06b",
  ],
  city: "Tel-Aviv",
  createdAt: new Date(),
};

export default function OrganizationProfile() {
  function getRating() {
    const events = Amutah.events;
    const rating: number[] = [];
    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        const comments = events[i].comments;
        let currentRating = 0;
        for (let j = 0; j < comments.length; j++) {
          currentRating += comments[j].rating;
        }
        rating.push(currentRating / comments.length);
      }

      const finalRating = rating.reduce((accumulator, current) => {
        return accumulator + current;
      }, 0);
      return `${(finalRating / rating.length).toFixed(1)}⭐️`;
    }
    return "";
  }

  return (
    <>
      <div className="flex flex-col items-center inset-x-0">
        <div className="images-container top-0 inset-x-0 relative flex flex-col items-center -mb-16">
          <div className="z-0">
            <img
              src={Amutah.images[1]}
              alt={`${Amutah.orgName}'s background photo`}
            />
          </div>
          <div className="z-20 flex gap-5 relative bottom-6">
            <img
              src={Amutah.images[0]}
              alt={`${Amutah.orgName}'s profile photo`}
              className="rounded-full relative bottom-10 w-32"
            />
            <button className="text-white h-fit text-sm">edit</button>
          </div>
        </div>
        <h1 className="font-bold">{Amutah.orgName}</h1>{" "}
        <span className="text-sm text-gray-500">
          since {Amutah.createdAt.getFullYear()}
        </span>
        <h3 className={Amutah.events.length > 0 ? "" : "hidden"}>
          has done {Amutah.events.length} events and have rating of{" "}
          {getRating()}{" "}
        </h3>{" "}
        <h5 className="text-sm">
          📞: {Amutah.phone} 📬: {Amutah.email}{" "}
        </h5>
        <hr />
        <p className="px-3 text-center">{Amutah.about}</p>
        <hr />
        <span className="text-sm">Events that {Amutah.orgName} had:</span>
        <div className="event-wrapper flex flex-wrap items-center justify-center gap-2">
          {Amutah.events.map((currentEv) => {
            return <EventViewCard ev={currentEv} key={currentEv.id} />;
          })}
        </div>
      </div>
    </>
  );
}
