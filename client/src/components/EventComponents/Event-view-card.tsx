import { useNavigate } from "react-router-dom";

export default function EventViewCard({ ev }: { ev: Event }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (ev?._id) {
            navigate(`/Event-page/${ev._id}`);
        }
    };

    const volunteersCount = ev?.volunteers?.length || 0;
    const capacity = ev?.capacity || 1;
    const capacityPercentages = (volunteersCount / capacity) * 100;

    const backgroundGradient =
        capacityPercentages > 66
            ? "bg-gradient-to-r from-green-400 to-green-600"
            : capacityPercentages > 33
            ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
            : "bg-gradient-to-r from-red-500 to-red-700";

    const textColor = capacityPercentages <= 33 ? "text-white" : "text-black";

    const monthNames = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
    ];
    const startDate = ev?.startTime ? new Date(ev.startTime) : null;
    const month = startDate ? monthNames[startDate.getMonth()] : "--";
    const day = startDate ? startDate.getDate() : "--";

    return (
        <div
            onClick={handleCardClick} // Navigate to event page on click
            className="h-fit my-4 flex flex-col justify-center items-center w-72 hover:scale-105 transform transition-transform duration-300 cursor-pointer"
        >
            <div className="relative shadow-lg rounded-lg overflow-hidden bg-white w-full">
                <img
                    src={ev?.images?.[0] || "https://via.placeholder.com/300"}
                    alt="Event"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex flex-col bg-white border border-gray-300 text-red-500 text-sm font-semibold rounded-md shadow-md px-2 py-1 text-center">
                    <span>{day}</span>
                    <hr className="border-t-1 border-gray-300 my-1" />
                    <span>{month}</span>
                </div>
                <div
                    className={`absolute bottom-4 right-4 ${backgroundGradient} ${textColor} rounded-md px-3 py-1 shadow-lg text-xs font-semibold`}
                >
                    {volunteersCount} / {capacity} Volunteers
                </div>
            </div>
            <div className="bg-white w-full p-4 rounded-b-lg shadow-md">
                <div className="mb-2">
                    <h3 className="font-bold text-lg text-gray-800">
                        {ev?.evName || "Event Name"}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {ev?.organization?.orgName || "Organization"}
                    </p>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                    📍 {ev?.address || "Location"}
                </p>
                <div className="text-sm font-medium text-gray-700 mb-3">
                    {startDate
                        ? `${startDate.toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                          })} -> ${new Date(ev?.endTime).toLocaleTimeString(
                              "en-GB",
                              { hour: "2-digit", minute: "2-digit" }
                          )}`
                        : "--:--"}
                </div>
                <div className="flex flex-wrap gap-2">
                    {ev?.tags?.length ? (
                        ev.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-medium bg-gray-200 rounded-full px-3 py-1 text-gray-700"
                            >
                                #{tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-gray-500">#NoTags</span>
                    )}
                </div>
            </div>
        </div>
    );
}
