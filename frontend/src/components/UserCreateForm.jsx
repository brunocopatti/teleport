import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUser } from "../api/users";
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

function UserCreateForm({ notificate }) {
  const [isLoading, setIsLoading] = useState(false);

	const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError
  } = useForm({
    resolver: zodResolver(userSchema),
  });

	const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await createUser(data);
      setValue("username", "");
      setValue("password", "");
      notificate({ message: "User created sucessfuly", type: "success" });
    } catch (error) {
      const message = error.response?.data.error || "Error creating user";
      if (message === "Username already taken") {
        setError("username", { message });
        return;
      }
      notificate({ message, type: "error" });
    } finally {
      setIsLoading(false);
    }
	};

	return (
		<form
      className="rounded-3xl border w-full min-w-fit max-w-96 px-4 py-6 flex flex-col gap-6 items-center h-fit bg-white dark:bg-gray-800"
      onSubmit={handleSubmit(onSubmit)}
      id="register"
      tabIndex={0}
    >
			<h3 className="text-3xl">Register</h3>
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
        Create account
      </FormButton>
		</form>
	)
}

export default UserCreateForm;
