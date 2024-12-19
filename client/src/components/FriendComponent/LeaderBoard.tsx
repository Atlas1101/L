import React, { useState, useEffect } from "react";

function getBadge(hours) {
    if (hours < 10) return { title: "Baby", icon: "🐣" };
    if (hours < 20) return { title: "First steps", icon: "👣" };
    if (hours < 30) return { title: "Novice", icon: "🫂" };
    if (hours < 40) return { title: "Beginner", icon: "🦾" };
    if (hours < 50) return { title: "Intermediate", icon: "🥰" };
    if (hours < 60) return { title: "Advanced", icon: "🚀" };
    if (hours < 70) return { title: "Master", icon: "👷🏻‍♂️" };
    if (hours < 80) return { title: "Hero", icon: "🦸🏻‍♂️" };
    if (hours < 90) return { title: "King", icon: "👑" };
    return { title: "Legendary", icon: "🌟" };
}
function getRankStyle(rank) {
    switch (rank) {
        case 1:
            return "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg border-2 border-yellow-600";
        case 2:
            return "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-md border-2 border-gray-600";
        case 3:
            return "bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 shadow-sm border-2 border-orange-600";
        default:
            return "bg-gray-100 shadow-md";
    }
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
                        const rankStyle = getRankStyle(index + 1);

                        return (
                            <li
                                key={friend._id}
                                className={`flex items-center justify-between p-4 rounded-lg ${rankStyle}`}
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
                                        className="w-12 h-12 rounded-full border-2"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">
                                            {friend.name}
                                        </p>
                                        <p className="text-sm text-gray-800">
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
