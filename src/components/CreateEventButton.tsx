import { useFormStatus } from "react-dom";
const CreateEventButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className=" mt-4 btn btn-primary" disabled={pending}>
      {pending ? "Creating..." : "Create"}
    </button>
  );
};

export default CreateEventButton;
