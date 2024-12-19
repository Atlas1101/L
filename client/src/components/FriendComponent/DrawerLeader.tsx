const mockUser = {
    name: "John Doe",
    friends: [
        {
            _id: "1",
            name: "Alice",
            profilePicture:
                "https://images.unsplash.com/photo-1726533815259-8fe320ac2493?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            profilePicture:
                "https://images.unsplash.com/photo-1726556267339-b8af2ccbb2f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            events: [{ hours: 12 }, { hours: 8 }, { hours: 15 }, { hours: 5 }], // Total: 40
        },
        {
            _id: "3",
            name: "Charlie",
            profilePicture:
                "https://images.unsplash.com/photo-1726516335449-eaa942fd4c2f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            profilePicture:
                "https://images.unsplash.com/photo-1732106450333-5c95a3763d31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            events: [{ hours: 20 }, { hours: 10 }, { hours: 15 }, { hours: 5 }], // Total: 50
        },
        {
            _id: "5",
            name: "Ethan",
            profilePicture:
                "https://images.unsplash.com/photo-1734389481041-fa26afc1267c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            events: [{ hours: 30 }, { hours: 25 }, { hours: 10 }], // Total: 65
        },
        {
            _id: "6",
            name: "Fiona",
            profilePicture:
                "https://images.unsplash.com/photo-1734310041853-bed8551e7f36?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            events: [{ hours: 18 }, { hours: 22 }, { hours: 10 }], // Total: 50
        },
        {
            _id: "7",
            name: "George",
            profilePicture:
                "https://images.unsplash.com/photo-1733902437690-7aa058e41c0a?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            events: [{ hours: 40 }, { hours: 15 }, { hours: 5 }], // Total: 60
        },
        {
            _id: "8",
            name: "Hannah",
            profilePicture:
                "https://images.unsplash.com/photo-1733902437716-6e1a5c737d37?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            events: [{ hours: 10 }, { hours: 5 }, { hours: 3 }], // Total: 18
        },
        {
            _id: "9",
            name: "Ivy",
            profilePicture:
                "https://images.unsplash.com/photo-1733866112992-7a245b5707f2?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            events: [{ hours: 45 }, { hours: 15 }, { hours: 20 }], // Total: 80
        },
        {
            _id: "10",
            name: "Jack",
            profilePicture:
                "https://images.unsplash.com/photo-1733513459406-7f605deb11c4?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
