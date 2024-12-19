const mockUser = {
    name: "John Doe",
    friends: [
        {
            _id: "1",
            name: "Alice",
            profilePicture: "https://via.placeholder.com/50",
            events: [
                { hours: 5 },
                { hours: 3 },
                { hours: 7 },
                { hours: 4 },
                { hours: 6 },
            ], // Total: 25
        },
        {
            _id: "2",
            name: "Bob",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 12 }, { hours: 8 }, { hours: 15 }, { hours: 5 }], // Total: 40
        },
        {
            _id: "3",
            name: "Charlie",
            profilePicture: "https://via.placeholder.com/50",
            events: [
                { hours: 6 },
                { hours: 8 },
                { hours: 9 },
                { hours: 3 },
                { hours: 2 },
            ], // Total: 28
        },
        {
            _id: "4",
            name: "Diana",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 20 }, { hours: 10 }, { hours: 15 }, { hours: 5 }], // Total: 50
        },
        {
            _id: "5",
            name: "Ethan",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 30 }, { hours: 25 }, { hours: 10 }], // Total: 65
        },
        {
            _id: "6",
            name: "Fiona",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 18 }, { hours: 22 }, { hours: 10 }], // Total: 50
        },
        {
            _id: "7",
            name: "George",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 40 }, { hours: 15 }, { hours: 5 }], // Total: 60
        },
        {
            _id: "8",
            name: "Hannah",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 10 }, { hours: 5 }, { hours: 3 }], // Total: 18
        },
        {
            _id: "9",
            name: "Ivy",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 45 }, { hours: 15 }, { hours: 20 }], // Total: 80
        },
        {
            _id: "10",
            name: "Jack",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 500 }, { hours: 25 }, { hours: 10 }], // Total: 85
        },
    ],
};

import { Trophy } from "lucide-react";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import FriendsLeaderboard from "@/components/FriendComponent/LeaderBoard";
export function DrawerLeader() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-[12%] right-3 z-50 rounded-full p-9 shadow-lg"
                >
                    <Trophy
                        style={{
                            width: "40px",
                            height: "40px",
                            color: "hsl(45, 100%, 50%)",
                        }}
                    />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="fixed left-0 top-0 h-full w-full max-w-md transform bg-white shadow-lg transition-transform duration-300 ease-in-out">
                <DrawerHeader>
                    <DrawerTitle>Friends Leaderboard</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                    <FriendsLeaderboard user={mockUser} />
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
