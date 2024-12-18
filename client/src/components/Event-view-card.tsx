import Event from "@/types/EventType";

export default function EventViewCard({ ev }: { ev: Event }) {
  const capacityPercentages = (ev.users.length / ev.capacity) * 100;
  // const capacityPercentages = (50 / ev.capacity) * 100;
  let backgroundColor: string;
  let textColor = "text-black";
  let month = "";

  // giving the volunteers colors
  if (capacityPercentages > 66) {
    backgroundColor = "bg-zinc-300";
  } else if (capacityPercentages > 33) {
    backgroundColor = "bg-yellow-200";
  } else {
    backgroundColor = "bg-red-500";
    textColor = "text-white";
  }

  // giving the current month in words
  switch (ev.startTime.getMonth() + 1) {
    case 1: {
      month = "JAN";
      break;
    }
    case 2: {
      month = "FEB";
      break;
    }
    case 3: {
      month = "MAR";
      break;
    }
    case 4: {
      month = "APR";
      break;
    }
    case 5: {
      month = "MAY";
      break;
    }
    case 6: {
      month = "JUN";
      break;
    }
    case 7: {
      month = "JUL";
      break;
    }
    case 8: {
      month = "AUG";
      break;
    }
    case 9: {
      month = "SEP";
      break;
    }
    case 10: {
      month = "OCT";
      break;
    }
    case 11: {
      month = "NOV";
      break;
    }
    case 12: {
      month = "DEC";
      break;
    }
  }

  return (
    <>
      <div className=" h-fit my-3 flex flex-col justify-center items-center w-64">
        <div className="relative">
          <img src={ev.images[0]} alt="" className="rounded-md" />
          <div className="flex flex-col bg-white border border-black w-fit p-1 rounded-md absolute top-2 right-2 text-red-500 shadow-3d text-center">
            {/* date div */}
            <span>{ev.startTime.getDate()}</span>
            <hr />
            <span>{month}</span>
          </div>
          <div
            className={`${backgroundColor} ${textColor} absolute right-2 bottom-2 rounded-md px-2 shadow-3d`}
          >
            {/* number of volunteers div*/}
            <span className="">
              {ev.users.length} / {ev.capacity} volunteers
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between w-full sm:flex-row">
          <div className="flex flex-col items-start p-2">
            <span className="font-bold">{ev.evName}</span>
            <span>{ev.organization}</span>
            <span className="text-sm">📍{ev.address}</span>
          </div>
          <div className="flex flex-col items-start p-2 w-auto sm:overflow-x-auto">
            <span className="text-end">
              {ev.startTime.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" -> "}
              {ev.endTime.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <div className="flex gap-2 w-full overflow-x-auto h-fit  ">
              {ev.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
