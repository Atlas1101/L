const mockUser = {
    name: "John Doe",
    friends: [
        {
            _id: "1",
            name: "Alice",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 5 }, { hours: 3 }, { hours: 7 }],
        },
        {
            _id: "2",
            name: "Bob",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 2 }, { hours: 4 }, { hours: 1 }],
        },
        {
            _id: "3",
            name: "Charlie",
            profilePicture: "https://via.placeholder.com/50",
            events: [{ hours: 6 }, { hours: 8 }],
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
import FriendsLeaderboard from "@/components/FriendComponent/LeaderBoard"; // Update path if necessary
export function DrawerLeader({ mockUser }) {
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
