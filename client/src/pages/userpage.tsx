import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserByUsername, getUserFriends } from "@/api/userAPI"; // קריאות API
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useNavigate } from "react-router-dom";
import EventViewCard from "@/components/EventComponents/Event-view-card"; // וידוי שה-import נכון

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // קריאה ל-API לקבלת פרטי המשתמש
      const userResponse = await getUserByUsername(username);
      if (userResponse.success) {
        setUser(userResponse.data); // עדכון הסטייט עם פרטי המשתמש
        console.log("User data:", userResponse.data); // לוג למידע של המשתמש
      } else {
        console.error("Error fetching user data:", userResponse.error);
      }

      // קריאה ל-API לקבלת רשימת החברים
      const friendsResponse = await getUserFriends(username);
      if (friendsResponse.success) {
        setFriends(friendsResponse.data); // עדכון הסטייט עם רשימת החברים
        console.log("User friends:", friendsResponse.data); // לוג לרשימת החברים
      } else {
        console.error("Error fetching friends:", friendsResponse.error);
      }
    };

    fetchData();
  }, [username]); // קריאה מתבצעת בכל פעם שה-username משתנה

  // אם לא קיבלתם מידע מה-API, הוצג ערכים ברירת מחדל
  const defaultUser = {
    username: "Unknown",
    bio: "No bio available",
    email: "No email available",
    phone: "No phone available",
    friends: [],
    events: [],
    city: "Unknown",
    age: 0,
    img: "https://www.w3schools.com/howto/img_avatar.png", // תמונה ברירת מחדל
  };

  const currentUser = user || defaultUser;

  const hours = currentUser.events.reduce((acc, ev) => acc + ev.hours, 0);
  let badgeTitle = "";
  let badgeIcon = "";

  // חישוב כמות שעות
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

  const someCondition = true; // האם זה פרופיל של המשתמש הנוכחי או לא
  const areFriends = false;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-100">
      {/* Avatar and Action Button */}
      <div className="flex flex-col items-center w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <Avatar className="w-32 h-32 shadow-lg">
          <AvatarImage
            src={currentUser.img}
            alt={`${currentUser.username}'s photo`}
          />
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
          {badgeIcon} @{currentUser.username}
        </span>
        <span className="text-lg text-gray-600">📍 {currentUser.city}</span>
        <span className="text-lg text-gray-600">
          📞 {currentUser.phone} 📬 {currentUser.email}
        </span>
        <span className="mt-2 italic text-center text-gray-500">
          {currentUser.bio}
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
            Friends ({currentUser.friends.length})
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-black">
                {currentUser.username}'s Friends
              </DrawerTitle>
              <DrawerDescription className="text-gray-600">
                Click on a name to view their profile.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <ul className="space-y-2">
                {currentUser.friends.map((friend: string) => (
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
        {currentUser.events.map((currentEv: any) => (
          <EventViewCard
            ev={currentEv}
            key={currentEv.id}
            className="w-full max-w-xs p-4 bg-white rounded-lg shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
