import Event from "@/types/EventType";
export default function EventViewCard({ ev }: { ev: Event }) {
    const volunteersCount = ev?.volunteers?.length || 0; // Use volunteers instead of users
    const capacity = ev?.capacity || 1; // Avoid division by zero
    const capacityPercentages = (volunteersCount / capacity) * 100;

    let backgroundColor: string;
    let textColor = "text-black";
    let month = "";

    // Assign background color based on capacity percentage
    if (capacityPercentages > 66) {
        backgroundColor = "bg-zinc-300";
    } else if (capacityPercentages > 33) {
        backgroundColor = "bg-yellow-200";
    } else {
        backgroundColor = "bg-red-500";
        textColor = "text-white";
    }

    // Format the month
    if (ev?.startTime) {
        const startDate = new Date(ev.startTime);
        switch (startDate.getMonth() + 1) {
            case 1:
                month = "JAN";
                break;
            case 2:
                month = "FEB";
                break;
            case 3:
                month = "MAR";
                break;
            case 4:
                month = "APR";
                break;
            case 5:
                month = "MAY";
                break;
            case 6:
                month = "JUN";
                break;
            case 7:
                month = "JUL";
                break;
            case 8:
                month = "AUG";
                break;
            case 9:
                month = "SEP";
                break;
            case 10:
                month = "OCT";
                break;
            case 11:
                month = "NOV";
                break;
            case 12:
                month = "DEC";
                break;
        }
    }

    return (
        <div className="h-fit my-3 flex flex-col justify-center items-center w-64">
            <div className="relative">
                <img
                    src={ev?.images?.[0] || "https://via.placeholder.com/150"} // Fallback for missing images
                    alt="Event"
                    className="rounded-md"
                />
                <div className="flex flex-col bg-white border border-black w-fit p-1 rounded-md absolute top-2 right-2 text-red-500 shadow-3d text-center">
                    <span>{new Date(ev?.startTime).getDate() || "--"}</span>
                    <hr />
                    <span>{month || "--"}</span>
                </div>
                <div
                    className={`${backgroundColor} ${textColor} absolute right-2 bottom-2 rounded-md px-2 shadow-3d`}
                >
                    <span>
                        {volunteersCount} / {capacity} volunteers
                    </span>
                </div>
            </div>
            <div className="flex flex-col justify-between w-full sm:flex-row">
                <div className="flex flex-col items-start p-2">
                    <span className="font-bold">
                        {ev?.evName || "Event Name"}
                    </span>
                    <span>{ev?.organization?.orgName || "Organization"}</span>
                    <span className="text-sm">
                        📍{ev?.address || "Address"}
                    </span>
                </div>
                <div className="flex flex-col items-start p-2 w-auto sm:overflow-x-auto">
                    <span className="text-end">
                        {new Date(ev?.startTime).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }) || "--:--"}
                        {" -> "}
                        {new Date(ev?.endTime).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }) || "--:--"}
                    </span>
                    <div className="flex gap-2 w-full overflow-x-auto h-fit">
                        {ev?.tags?.map((tag) => (
                            <span key={tag}>#{tag}</span>
                        )) || <span>#NoTags</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
