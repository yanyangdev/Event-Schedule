import { useContext } from "react";
import { EventContext } from "../context";
import type { EventContextType } from "../types";

const useEvents = (): EventContextType => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEvents must be used within a EventContextProvider");
  }
  return context;
};

export default useEvents;
