const Amutah = {
    name: "Microsoft",
    generalDetails:
        "A non-profit organization dedicated to community support and development.",
    events: [
        { comments: [{ rating: 5 }, { rating: 4 }, { rating: 3 }] },
        { comments: [{ rating: 2 }, { rating: 1 }, { rating: 4 }] },
        { comments: [{ rating: 2 }] },
        { comments: [{ rating: 3 }, { rating: 4 }] },
    ],
    email: "info@helpinghands.org",
    phone: "+972501234567",
    photos: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8u8BZcgcIxcfgSJsas_HDf2pfYTBlmo2q3g&s",
        "https://i.pinimg.com/736x/a5/39/b5/a539b509dd3f03a36bb7d89f813ed63e.jpg",
    ],
};

export default function OrganizationProfile() {
    function getRating() {
        const events = Amutah.events;
        const rating: number[] = [];
        if (events.length > 0) {
            //   for (let i = 0; i < events.length; i++) {
            //     const comments = events[i].comments;
            //     let currentRating = 0;
            //     for (let j = 0; j < comments.length; j) {
            //       currentRating += comments[j].rating;
            //     }
            //     rating.push(currentRating / comments.length);
            //   }
            //   const finalRating = rating.reduce((accumulator, current) => {
            //     return accumulator + current;
            //   }, 0);
            //   return `${(finalRating / rating.length).toFixed(1)}⭐️`;
        }
        return "";
    }

    return (
        <>
            <img
                src={Amutah.photos[1]}
                alt={`${Amutah.name} background photo`}
                className="absolute top-0 inset-x-0 z-0"
            />
            <div className="flex relative gap-2 -top-10 items-center">
                <img
                    src={Amutah.photos[0]}
                    alt={`${Amutah.name} profile photo`}
                    className="relative z-100 rounded-full"
                />
                <button className="text-white h-fit">edit</button>
            </div>
            <h1>
                {Amutah.name} {getRating()}
            </h1>
        </>
    );
}
