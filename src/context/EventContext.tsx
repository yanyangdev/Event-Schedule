import { createContext, useState, useEffect } from "react";
import type { EventContextType } from "../types";
import type { Event } from "../types";

const EventContext = createContext<EventContextType>({
  events: [],
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
  const [events, setEvents] = useState<Event[] | []>([]);

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
        const data = await response.json();

        // return data;
        setEvents(data.results);
        setError(false);
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
