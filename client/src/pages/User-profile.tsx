import EventViewCard from "@/components/EventComponents/Event-view-card";
import User from "@/types/user";
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
import { useSelector, UseSelector } from "react-redux";

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
  const user = useSelector((state: RootState) => state.user);
  console.log(user.userData.username.username);
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

  return (
    <>
      <div className="relative flex flex-col items-center justify-center gap-1">
        <div className="text-white ">
          <Avatar>
            <AvatarImage src={user.img} alt={`${user.userName}'s photo`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {someCondition ? (
            <button className="relative bg-red-600 bottom-12">
              edit profile
            </button>
          ) : areFriends ? (
            <button>remove friend</button>
          ) : (
            <button>add friend</button>
          )}
        </div>
        <div className="mb-7"></div>
        <span className="text-xl font-bold">
          {badgeIcon} @{user.userName}
        </span>
        <span className="sm">📍{user.city}</span>
        <span className="text-lg">
          📞: {user.phone} 📬: {user.email}
        </span>
        <div className="flex gap-6 p-2 border border-black shadow-2xl justify-evenly w-fit">
          <div className="flex flex-col">
            <span>{hours} hours of volunteering!</span>
            <span>
              {badgeTitle}
              {badgeIcon}
            </span>
          </div>
          <Drawer>
            <DrawerTrigger className="text-black bg-white">
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
        <div className="flex flex-wrap items-center justify-center event-wrapper">
          {user.events.map((currentEv) => {
            return <EventViewCard ev={currentEv} key={currentEv.id} />;
          })}
        </div>
      </div>
    </>
  );
}
