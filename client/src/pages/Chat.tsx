import React from "react";

export default function ChatComingSoon() {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {/* Chat Icon */}
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 8h10M7 12h6m-2 8a9 9 0 100-18 9 9 0 000 18z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Chat Feature Coming Soon
                </h1>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                    We're working hard to bring you an amazing chat experience.
                    Stay tuned for updates!
                </p>

                {/* Placeholder Input (Optional) */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Say hi... (Coming Soon)"
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-400 focus:outline-none focus:ring focus:ring-blue-300 cursor-not-allowed"
                    />
                </div>

                {/* Button */}
                <button
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors disabled:opacity-50"
                    disabled
                >
                    Start Chatting
                </button>
            </div>
        </div>
    );
}
