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
        <div className="flex flex-col justify-center items-center gap-6 p-6 bg-gray-100 min-h-screen">
            {/* Avatar and Action Button */}
            <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg w-full max-w-md">
                <Avatar className="w-32 h-32 shadow-lg">
                    <AvatarImage
                        src={user.img}
                        alt={`${user.userName}'s photo`}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {someCondition ? (
                    <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                        Edit Profile
                    </button>
                ) : areFriends ? (
                    <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700">
                        Remove Friend
                    </button>
                ) : (
                    <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
                        Add Friend
                    </button>
                )}
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg w-full max-w-md">
                <span className="font-bold text-2xl flex items-center gap-2">
                    {badgeIcon} @{user.userName}
                </span>
                <span className="text-gray-600 text-lg">📍 {user.city}</span>
                <span className="text-gray-600 text-lg">
                    📞 {user.phone} 📬 {user.email}
                </span>
                <span className="mt-2 text-gray-500 italic text-center">
                    {user.bio}
                </span>
            </div>

            {/* Hours and Badge */}
            <div className="flex items-center justify-between gap-4 bg-white shadow-md p-6 rounded-lg w-full max-w-md">
                <div className="flex flex-col items-center">
                    <span className="text-gray-800 font-bold text-xl">
                        {hours}
                    </span>
                    <span className="text-gray-500">Hours Volunteered</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-gray-800 font-bold text-xl">
                        {badgeTitle} {badgeIcon}
                    </span>
                    <span className="text-gray-500">Badge</span>
                </div>
                <Drawer>
                    <DrawerTrigger className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-md hover:bg-gray-200">
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
                                        className="hover:underline text-blue-600"
                                    >
                                        {friend}
                                    </li>
                                ))}
                            </ul>
                            <DrawerClose className="mt-4 text-red-500">
                                Close
                            </DrawerClose>
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
                        className="shadow-lg rounded-lg p-4 bg-white w-full max-w-xs"
                    />
                ))}
            </div>
        </div>
    );
}
