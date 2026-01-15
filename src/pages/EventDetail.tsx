import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { EventMap } from "../components";
import {
  FetchEventSchema,
  type FetchEventResponse,
  type Event,
} from "../Schemas";
import z from "zod/v4";

const EventDetail = () => {
  // const { events, setEvents } = useEvents();
  const [event, setEvent] = useState<Event | null>(null);
  const { id } = useParams();

  // Fetch events from the server
  useEffect(() => {
    async function fetchData(): Promise<FetchEventResponse> {
      try {
        const response = await fetch(`http://localhost:3001/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const fetchedData = await response.json();
        const { data, error, success } =
          FetchEventSchema.safeParse(fetchedData);
        if (!success) throw new Error(z.prettifyError(error));
        setEvent(data.event);
        return data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error("Fetch failed", error);
        }
        throw new Error("Fetch failed: unknown error");
      }
    }

    fetchData();
  }, [id]);

  console.log("event data", event);
  if (!event) {
    return <div>Loading...</div>;
  }
  return (
    <div className="card card-lg  bg-base-100 max-h-2/3 shadow-sm  transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg space-y-2 pt-2  max-w-2/3 mx-auto my-8">
      <div className="card-body px-0 py-0 space-y-2 items-center text-center  ">
        <h2 className="card-title border-b border-b-gray-300">{event.title}</h2>

        <p className="card-text ">{event.description}</p>

        <p>
          {event.date &&
            event.date.split("T")[0] +
              " At " +
              event.date.split("T")[1].split(":")[0] +
              ":" +
              event.date.split("T")[1].split(":")[1]}
        </p>
        <p>{event.location}</p>
      </div>

      <EventMap
        location={event.location}
        latitude={event.latitude}
        longitude={event.longitude}
      />
    </div>
  );
};

export default EventDetail;
