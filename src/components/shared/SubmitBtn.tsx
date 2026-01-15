import { useFormStatus } from "react-dom";
const SubmitBtn = ({ children }) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-accent w-64" disabled={pending}>
      {pending ? `${children}...` : children}
    </button>
  );
};

export default SubmitBtn;
