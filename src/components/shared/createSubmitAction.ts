import { toast } from "react-toastify";
import type { LoginActionState } from "../../Schemas";

type Props = {
  url: string;
  successMessage: string;
  onSuccess: (data?: LoginActionState) => void;
};
export const createSubmitAction = ({
  url,
  successMessage,
  onSuccess,
}: Props) => {
  return async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error);
        return;
      }
      const data = await res.json();
      toast(successMessage);

      onSuccess(data);
    } catch (error) {
      console.error(error);
    }
  };
};
