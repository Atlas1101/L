import React, { useState, useEffect } from "react";

function getBadge(hours) {
    if (hours < 10) return { title: "baby", icon: "🐣" };
    if (hours < 20) return { title: "first steps", icon: "👣" };
    if (hours < 30) return { title: "novice", icon: "🫂" };
    if (hours < 40) return { title: "beginner", icon: "🦾" };
    if (hours < 50) return { title: "intermediate", icon: "🥰" };
    if (hours < 60) return { title: "advanced", icon: "🚀" };
    if (hours < 70) return { title: "master", icon: "👷🏻‍♂️" };
    if (hours < 80) return { title: "hero", icon: "🦸🏻‍♂️" };
    if (hours < 90) return { title: "king", icon: "👑" };
    return { title: "legendary", icon: "🌟" };
}

export default function FriendsLeaderboard({ user }) {
    const [friendsLeaderboard, setFriendsLeaderboard] = useState([]);

    useEffect(() => {
        // Calculate leaderboard data from user.friends
        if (user && user.friends) {
            const leaderboard = user.friends.map((friend) => {
                const totalHours = friend.events.reduce(
                    (acc, ev) => acc + ev.hours,
                    0
                );
                return { ...friend, hours: totalHours };
            });

            // Sort friends by hours volunteered (descending order)
            leaderboard.sort((a, b) => b.hours - a.hours);
            setFriendsLeaderboard(leaderboard);
        }
    }, [user]);

    return (
        <div className="my-8 w-full px-4">
            <h2 className="text-xl font-bold mb-4">Friends Leaderboard</h2>
            {friendsLeaderboard.length > 0 ? (
                <ul className="space-y-4">
                    {friendsLeaderboard.map((friend, index) => {
                        const badge = getBadge(friend.hours);

                        return (
                            <li
                                key={friend._id}
                                className="flex items-center justify-between p-4 rounded-lg shadow-md bg-gray-100"
                            >
                                {/* Rank */}
                                <span className="text-lg font-bold">
                                    #{index + 1}
                                </span>

                                {/* Friend Info */}
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={
                                            friend.profilePicture ||
                                            "https://via.placeholder.com/50"
                                        }
                                        alt={`${friend.name}'s profile`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">
                                            {friend.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {friend.hours} hours volunteered
                                        </p>
                                    </div>
                                </div>

                                {/* Badge */}
                                <div className="flex items-center space-x-2">
                                    <span>{badge.icon}</span>
                                    <span className="text-sm font-medium">
                                        {badge.title}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-gray-500">No friends to display</p>
            )}
        </div>
    );
}
