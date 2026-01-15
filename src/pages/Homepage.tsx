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
    <div className="grid min-h-full  gap-6  mx-0 my-16 text-gray-400 grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]   auto-rows-min ">
      {events.map((event) => {
        return <EventCard key={event.id} {...event} />;
      })}
    </div>
  );
};

export default Homepage;
