import { useNavigate } from "react-router";
import { SubmitBtn, createSubmitAction } from "../components";

const SignUp = () => {
  const navigate = useNavigate();

  const submitAction = createSubmitAction({
    url: "http://localhost:3001/api/users/",
    successMessage: "Registierung erfolgreich!",
    onSuccess: () => navigate("/signin"),
  });

  return (
    <div className="max-w-md mx-auto mt-20 flex flex-col items-center">
      <form action={submitAction} className="grid grid-cols-1 gap-2">
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
            minLength="8"
            title="Must be more than 8 characters"
          />
        </label>
        <p className="validator-hint hidden">Must be more than 8 characters</p>
        <SubmitBtn>Registieren</SubmitBtn>
      </form>
    </div>
  );
};

export default SignUp;
