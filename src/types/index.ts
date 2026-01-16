import { type Event } from "../Schemas/index";
export type AuthContextType = {
  isLogIn: boolean;
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
};
export type EventContextType = {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  isLoading: boolean;
  error: boolean;
};
