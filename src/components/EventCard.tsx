import { useNavigate } from "react-router";
import type { Event } from "../Schemas";
import EventMap from "./EventMap";

const EventCard = ({
  id,
  title,
  description,
  date,
  location,
  latitude,
  longitude,
}: Event) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/events/${id}`)}
      className="card card-lg  bg-base-100 h-full shadow-sm  transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg space-y-2 pt-2 "
    >
      <div className="card-body px-0 py-0 space-y-2 items-center text-center  ">
        <h2 className="card-title border-b border-b-gray-300 text-black">
          {title}
        </h2>

        <p className="card-text ">{description}</p>

        <p>
          {date.split("T")[0] +
            " At " +
            date.split("T")[1].split(":")[0] +
            ":" +
            date.split("T")[1].split(":")[1]}
        </p>
        <p className="text-black">{location}</p>
      </div>

      <figure>
        <EventMap
          location={location}
          latitude={latitude}
          longitude={longitude}
        />
      </figure>
    </div>
  );
};

export default EventCard;
