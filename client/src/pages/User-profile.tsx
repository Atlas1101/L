import EventViewCard from "@/components/EventComponents/Event-view-card";
import User from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
import { log } from "console";

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
  const navigate = useNavigate();

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
    badgeTitle = "Baby";
    badgeIcon = "🐣";
  } else if (hours < 20) {
    badgeTitle = "First Steps";
    badgeIcon = "👣";
  } else if (hours < 30) {
    badgeTitle = "Novice";
    badgeIcon = "🫂";
  } else if (hours < 40) {
    badgeTitle = "Beginner";
    badgeIcon = "🦾";
  } else if (hours < 50) {
    badgeTitle = "Intermediate";
    badgeIcon = "🥰";
  } else if (hours < 60) {
    badgeTitle = "Advanced";
    badgeIcon = "🚀";
  } else if (hours < 70) {
    badgeTitle = "Master";
    badgeIcon = "👷🏻‍♂️";
  } else if (hours < 80) {
    badgeTitle = "Hero";
    badgeIcon = "🦸🏻‍♂️";
  } else if (hours < 90) {
    badgeTitle = "King";
    badgeIcon = "👑";
  } else {
    badgeTitle = "Legendary";
    badgeIcon = "🌟";
  }

  const someCondition = true; // is the user viewing their own profile or someone else's
  const areFriends = false;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-100">
      {/* Avatar and Action Button */}
      <div className="flex flex-col items-center w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <Avatar className="w-32 h-32 shadow-lg">
          <AvatarImage src={user.img} alt={`${user.userName}'s photo`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {someCondition ? (
          <button className="px-4 py-2 mt-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
            Edit Profile
          </button>
        ) : areFriends ? (
          <button className="px-4 py-2 mt-3 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700">
            Remove Friend
          </button>
        ) : (
          <button className="px-4 py-2 mt-3 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700">
            Add Friend
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <span className="flex items-center gap-2 text-2xl font-bold">
          {badgeIcon} @{user.userName}
        </span>
        <span className="text-lg text-gray-600">📍 {user.city}</span>
        <span className="text-lg text-gray-600">
          📞 {user.phone} 📬 {user.email}
        </span>
        <span className="mt-2 italic text-center text-gray-500">
          {user.bio}
        </span>
      </div>

      {/* Hours and Badge */}
      <div className="flex items-center justify-between w-full max-w-md gap-4 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-gray-800">{hours}</span>
          <span className="text-gray-500">Hours Volunteered</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-gray-800">
            {badgeTitle} {badgeIcon}
          </span>
          <span className="text-gray-500">Badge</span>
        </div>
        <Drawer>
          <DrawerTrigger className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200">
            Friends ({user.friends.length})
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-black">
                {user.userName}'s Friends
              </DrawerTitle>
              <DrawerDescription className="text-gray-600">
                Click on a name to view their profile.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <ul className="space-y-2">
                {user.friends.map((friend) => (
                  <li
                    key={friend}
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${friend}`)}
                  >
                    {friend}
                  </li>
                ))}
              </ul>
              <DrawerClose className="mt-4 text-red-500">Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Events */}
      <div className="flex flex-wrap justify-center gap-6">
        {user.events.map((currentEv) => (
          <EventViewCard
            ev={currentEv}
            key={currentEv.id}
            className="w-full max-w-xs p-4 bg-white rounded-lg shadow-lg"
          />
        ))}
      </div>
    </div>
  );
}
