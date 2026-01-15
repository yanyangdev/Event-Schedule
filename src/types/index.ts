import { type Event } from "../Schemas/index";
export type AuthContextType = {
  isLogIn: boolean;
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
};
export type EventContextType = {
  events: Event[];
  setEvents: (events: Event[]) => void;
  isLoading: boolean;
  error: boolean;
};
