import { Routes, Route } from "react-router";
import {
  CreateEvent,
  Homepage,
  SignIn,
  SignUp,
  EventDetail,
  NotFound,
} from "./pages";
import { MainLayout, ProtectedLayout } from "./layouts";
import { EventContextProvider, AuthContextProvider } from "./context";

function App() {
  return (
    <EventContextProvider>
      <AuthContextProvider>
        <div
          className="min-h-screen w-full grid grid-rows-[auto_1fr_auto]
          font-['Outfit']  "
        >
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Homepage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/events/:id" element={<EventDetail />} />
            </Route>

            <Route element={<ProtectedLayout />}>
              <Route path="/api/events/new" element={<CreateEvent />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </EventContextProvider>
  );
}
export default App;
