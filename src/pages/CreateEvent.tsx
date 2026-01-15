import { toast } from "react-toastify";
import { useEvents } from "../hooks";
import { CreateEventButton } from "../components";
import { useNavigate } from "react-router";

const CreateEvent = () => {
  const { events, setEvents } = useEvents();
  const navigate = useNavigate();

  const createAction = async (formData) => {
    //todo: check if user is logged in and if not redirect to login page (localstorage can be used to retrieve the token )
    const authToken = JSON.parse(localStorage.getItem("token"));
    console.log("authToken", authToken);

    if (!authToken) {
      toast.error("Please login to create an event");
      return;
    }

    const data = Object.fromEntries(formData);

    for (const [key, value] of Object.entries(data)) {
      if (value === "") {
        toast.error("Please fill all fields");
        return; // Exits the function if a field is empty
      }
    }
    console.log("data from create", data);
    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the token in the Authorization header
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        /*  const errorText = await response.text();
        console.error("Server response:", response.status, errorText); */
        toast.error("Error creating event");
        throw new Error(`Error creating event: ${response.status}`);
      }

      const newEvent = await response.json(); // Get the actual created event
      console.log("newEvent", newEvent);
      setEvents((prev) => [...prev, newEvent]); // Add the server response

      // Navigate to home page on successful POST
      navigate("/");
      toast.success("Event created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error creating event");
    }
    console.log(data);
  };
  /*
  "title": "Event Title",
  "description": "Some Description for the Event",
  "date": "2025-08-06T01:51:00.408Z",
  "location": "Schloßbezirk 10, 76131 Karlsruhe",
  "latitude": 8.404746955649602,
  "longitude": 49.01438194665317 */
  return (
    <form action={createAction}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm mx-auto mt-16 border p-4 text-black">
        <legend className="fieldset-legend text-xl">Create Event</legend>
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="input"
          placeholder="My awesome page"
        />
        <label htmlFor="description" className="label">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="input"
          name="description"
          placeholder="my-awesome-page"
        />
        <label htmlFor="date" className="label">
          Date
        </label>
        <input
          type="date"
          id="date"
          className="input"
          name="date"
          placeholder="2025-08-06"
        />
        <label htmlFor="location" className="label">
          Location
        </label>
        <input
          type="text"
          id="location"
          className="input"
          name="location"
          placeholder="Somewhere"
        />
        <label htmlFor="latitude" className="label">
          Latitude
        </label>
        <input
          type="number"
          id="latitude"
          className="input"
          name="latitude"
          step="any"
          placeholder="8.404746955649602"
        />
        <label htmlFor="longitude" className="label">
          Longitude
        </label>
        <input
          type="number"
          id="longitude"
          className="input"
          name="longitude"
          step="any"
          placeholder="49.01438194665317"
        />
        <CreateEventButton />
      </fieldset>
    </form>
  );
};

export default CreateEvent;
