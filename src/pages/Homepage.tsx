import { EventCard } from "../components";
import { useEvents } from "../hooks";
// Fetch events (GET /api/events) and render them as cards sorted chronologically.
const Homepage = () => {
  const { events, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <div className="flex w-full h-full flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }
  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {events.map((event) => {
        return <EventCard key={event.id} {...event} />;
      })}
    </div>
  );
};

export default Homepage;
