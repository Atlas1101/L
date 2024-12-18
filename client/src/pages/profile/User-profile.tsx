import EventViewCard from "@/components/Event-view-card";
import User from "@/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const user: User = {
  userName: "Liraz",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJU0xNuXogCM5T_euKq_q17d0Ispz5s-b86w&s",
  bio: "please help me im under the water",
  email: "liraz@gmail.com",
  phone: "0501234567",
  password: "1234567890",
  friends: ["Ahron", "Ori", "Amit", "Itay", "Porat"],
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
      tags: ["money", "beingLame", "takingMoney"],
      startTime: new Date(),
      endTime: new Date(),
      hours: 99,
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
  city: "Here",
  age: 18,
};

export default function UserProfile() {
  const hours = getHours();
  let badgeTitle = "";
  let badgeIcon = "";

  function getHours() {
    let hours = 0;
    user.events.forEach((ev) => {
      hours += ev.hours;
    });
    return hours;
  }

  if (hours < 10) {
    badgeTitle = "baby";
    badgeIcon = "🐣";
  } else if (hours < 20) {
    badgeTitle = "first steps";
    badgeIcon = "👣";
  } else if (hours < 30) {
    badgeTitle = "novice";
    badgeIcon = "🫂";
  } else if (hours < 40) {
    badgeTitle = "beginner";
    badgeIcon = "🦾";
  } else if (hours < 50) {
    badgeTitle = "intermediate";
    badgeIcon = "🥰";
  } else if (hours < 60) {
    badgeTitle = "advanced";
    badgeIcon = "🚀";
  } else if (hours < 70) {
    badgeTitle = "master";
    badgeIcon = "👷🏻‍♂️";
  } else if (hours < 80) {
    badgeTitle = "hero";
    badgeIcon = "🦸🏻‍♂️";
  } else if (hours < 90) {
    badgeTitle = "king";
    badgeIcon = "👑";
  } else {
    badgeTitle = "legendary";
    badgeIcon = "🌟";
  }

  const someCondition = true; //i the user viewing his own profile or someone else's
  const areFriends = false;
  const btnStyle = "";
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-1 relative">
        <div className="text-white ">
          <Avatar>
            <AvatarImage src={user.img} alt={`${user.userName}'s photo`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {someCondition ? (
            <button className="relative bottom-12 bg-red-600">
              edit profile
            </button>
          ) : areFriends ? (
            <button>remove friend</button>
          ) : (
            <button>add friend</button>
          )}
        </div>

        <span className="font-bold text-xl">
          {badgeIcon} @{user.userName}
        </span>
        <span className="sm">📍{user.city}</span>
        <span className="text-lg">
          📞: {user.phone} 📬: {user.email}
        </span>
        <div className="border border-black flex justify-evenly gap-6 w-fit p-2 shadow-2xl">
          <div className="flex flex-col">
            <span>{hours} hours of volunteering!</span>
            <span>
              {badgeTitle}
              {badgeIcon}
            </span>
          </div>
          <Drawer>
            <DrawerTrigger className="bg-white text-black">
              <span>{user.friends.length} friends</span>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-black">
                  All of {user.userName}'s friends
                </DrawerTitle>
                <DrawerDescription>
                  Click on each to go to their profile page
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="overflow-x-auto">
                <div className="overflow-x-auto">
                  {user.friends.map((friend) => {
                    return (
                      <a key={friend} href="#">
                        {friend}
                      </a>
                    );
                  })}
                </div>
                {/* ------------------------------------------------------------------edit friends here------------------------------------------------------------ */}
                <DrawerClose className="text-white">Close</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <span>{user.bio}</span>
        <div className="event-wrapper flex flex-wrap items-center justify-center">
          {user.events.map((currentEv) => {
            return <EventViewCard ev={currentEv} key={currentEv.id} />;
          })}
        </div>
      </div>
    </>
  );
}
