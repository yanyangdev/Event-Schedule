import { Link } from "react-router";
import { useAuth } from "../context";
const Heading = () => {
  const { isLogIn, logout } = useAuth();
  return (
    <header className="bg-neutral text-white flex flex-col items-center md:flex-row justify-between p-4 ">
      <h1 className="btn btn-ghost text-3xl">
        <Link to="/">Event Scheduler</Link>{" "}
      </h1>
      <nav>
        <ul className="flex flex-col sm:flex-row">
          <Link className="btn btn-ghost" to="/">
            Home
          </Link>
          {isLogIn && (
            <Link className="btn btn-ghost" to="/api/events/new">
              Add Event
            </Link>
          )}
          {!isLogIn && (
            <Link className="btn btn-ghost" to="/signin">
              Anmelden
            </Link>
          )}
          {isLogIn && (
            <Link className="btn btn-ghost" to="/" onClick={logout}>
              Abmelden
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Heading;
