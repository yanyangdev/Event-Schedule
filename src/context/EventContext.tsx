import { createContext, useState, useEffect } from "react";
import { type EventContextType } from "../types";
import { FetchEventsSchema, type Event } from "../Schemas";
import { z } from "zod/v4";

const EventContext = createContext<EventContextType>({
  events: [] as Event[],
  setEvents: () => {},
  isLoading: true,
  error: false,
});

type EventContextProviderProps = {
  children: React.ReactNode;
};

export const EventContextProvider = ({
  children,
}: EventContextProviderProps) => {
  // State to store the events
  const [events, setEvents] = useState<Event[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch events from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events");
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const getData = await response.json();
        // data.results 的type为 FetchEventResponse[] 类型, FetchEventResponse 类型是由event + 其他属性组成的,需要将其中的Event类型提取出来

        const { data, success, error } = FetchEventsSchema.safeParse(
          getData.results
        );
        if (!success) {
          console.error("Error fetching data:", z.prettifyError(error));
          setError(true);
          return null;
        }

        const getEvents = data.map((d) => {
          return {
            id: d.id,
            title: d.title,
            description: d.description,
            date: d.date,
            location: d.location,
            latitude: d.latitude,
            longitude: d.longitude,
          };
        });

        // return data;
        setEvents(getEvents);
        // setError(false);
        // return data;
      } catch (error) {
        console.error(error);
        setError(true);
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <EventContext value={{ events, setEvents, isLoading, error }}>
      {children}
    </EventContext>
  );
};

export default EventContext;
