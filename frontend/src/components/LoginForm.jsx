import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authenticate } from "../api/auth";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import FormError from "./FormError";

const userSchema = z.object({
	username: z.string()
		.min(1, "Username must not be empty")
		.max(255, "Username must have less than 255 characters"),
	password: z.string()
		.min(1, "Password must not be empty")
		.max(255, "Password must have less than 255 characters")
});

function LoginForm({ setCredentials, notificate, setActiveRedirect }) {
  const [isLoading, setIsLoading] = useState(false);

	const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(userSchema),
  });

	const onSubmit = async (data) => {
		try {
      setIsLoading(true);
      const credentials = await authenticate(data);
      setValue("username", "");
      setValue("password", "");
      setCredentials(credentials);
      setActiveRedirect(null);
    } catch (error) {
      notificate({ message: "Error authenticating", type: "error" });
    } finally {
      setIsLoading(false);
    }
	};

	return (
		<form
      className="rounded-3xl border w-full min-w-fit max-w-96 px-4 py-6 flex flex-col gap-6 items-center h-fit bg-white dark:bg-gray-800"
      onSubmit={handleSubmit(onSubmit)}
    >
			<h3 className="text-3xl">Login</h3>
			<div className="flex flex-col gap-2">
        <div>
          <label>
            <span className="sr-only">Username</span>
            <FormInput
              {...register("username")}
              placeholder="username"
              disabled={isLoading}
            />
          </label>
          {errors.username && <FormError>{errors.username.message}</FormError>}
        </div>
  
        <div>
          <label>
            <span className="sr-only">Password</span>
            <FormInput
              type="password"
              {...register("password")}
              placeholder="password"
              disabled={isLoading}
            />
          </label>
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </div>
      </div>
      <FormButton
        type="submit"
        disabled={isLoading}
      >
        Authenticate
      </FormButton>
		</form>
	)
}

export default LoginForm;
