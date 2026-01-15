import { createSubmitAction } from "../components/shared/createSubmitAction";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context";
import { SubmitBtn } from "../components";
const SignIn = () => {
  const { setIsLogIn } = useAuth();
  const navigate = useNavigate();

  const submitAction = createSubmitAction({
    url: "http://localhost:3001/api/auth/login",
    successMessage: "Anmeldung erfolgreich",
    onSuccess: (data) => {
      const token = data.token;
      setIsLogIn(true);
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/");
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 flex flex-col items-center">
      <form action={submitAction} className="grid grid-cols-1 gap-2 ">
        <label className="validator">
          <span className=" flex font-bold"> Email: </span>
          <input
            className="input w-64"
            type="email"
            name="email"
            placeholder="excample@email.com"
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
        <label className="validator">
          <span className=" flex font-bold"> Password: </span>
          <input
            className="input w-64"
            type="password"
            name="password"
            required
            placeholder="Password"
            minLength={8}
            title="Must be more than 8 characters"
          />
        </label>
        <p className="validator-hint hidden">Must be more than 8 characters</p>
        <Link to="/signUp" className="link text-blue-500 text-sm ">
          Neu Konto erstellen!
        </Link>
        <SubmitBtn>Anmelden</SubmitBtn>
      </form>
    </div>
  );
};

export default SignIn;
