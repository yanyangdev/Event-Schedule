import { toast } from "react-toastify";
import { useEvents } from "../hooks";
import { CreateEventButton } from "../components";
import { useNavigate } from "react-router";
import { EventSchema } from "../Schemas";
import { z } from "zod/v4";
import type React from "react";

const CreateEvent = () => {
  const { setEvents } = useEvents();
  const navigate = useNavigate();

  const createAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    //todo: check if user is logged in and if not redirect to login page (localstorage can be used to retrieve the token )
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to create an event");
      return;
    }
    const authToken = JSON.parse(token);

    const rawData = Object.fromEntries(formData);

    const sendData = {
      title: rawData.title,
      description: rawData.description,
      date: rawData.date,
      location: rawData.location,
      latitude: Number(rawData.latitude),
      longitude: Number(rawData.longitude),
    };
    // console.log("data from create", data);
    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the token in the Authorization header
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(sendData),
      });
      if (!response.ok) {
        /*  const errorText = await response.text();
        console.error("Server response:", response.status, errorText); */
        toast.error("Error creating event");
        return;
      }

      const result = await response.json(); // Get the actual created event
      const { data, success, error } = EventSchema.safeParse(result);
      if (!success) {
        // console.log(error);
        toast.error(z.prettifyError(error));
        throw new Error(z.prettifyError(error));
      }
      // console.log("newEvent", newEvent);
      setEvents((prev) => [...prev, data]); // Add the server response
      toast.success("Event created successfully");

      // Navigate to home page on successful POST
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.error(error);
      toast.error("Error creating event");
      return;
    }
    // console.log(data);
  };
  /*
  "title": "Event Title",
  "description": "Some Description for the Event",
  "date": "2025-08-06T01:51:00.408Z",
  "location": "Schloßbezirk 10, 76131 Karlsruhe",
  "latitude": 8.404746955649602,
  "longitude": 49.01438194665317 */
  return (
    <form onSubmit={createAction}>
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
        />
        <CreateEventButton />
      </fieldset>
    </form>
  );
};

export default CreateEvent;
