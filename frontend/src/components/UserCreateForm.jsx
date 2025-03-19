import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUser } from "../api/users";

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
      className="rounded-3xl border w-full min-w-fit max-w-96 px-4 py-6 flex flex-col gap-6 items-center h-fit bg-white"
      onSubmit={handleSubmit(onSubmit)}
      id="register"
      tabIndex={0}
    >
			<h3 className="text-3xl">Register</h3>
			<div className="flex flex-col gap-2">
        <div>
          <label>
            <span className="sr-only">Username</span>
            <input
              className="border px-4 py-1 rounded-full w-60 disabled:opacity-50"
              {...register("username")}
              placeholder="username"
              disabled={isLoading}
            />
          </label>
          {errors.username && <p className="text-red-700">{errors.username.message}</p>}
        </div>
  
        <div>
          <label>
            <span className="sr-only">Password</span>
            <input
              className="border px-4 py-1 rounded-full w-60 disabled:opacity-50"
              type="password"
              {...register("password")}
              placeholder="password"
              disabled={isLoading}
            />
          </label>
          {errors.password && <p className="text-red-700">{errors.password.message}</p>}
        </div>
      </div>
      <button
        className="rounded-full px-8 py-2 bg-black text-white text-lg cursor-pointer disabled:opacity-50 disabled:cursor-auto"
        type="submit"
        disabled={isLoading}
      >
        Create account
      </button>
		</form>
	)
}

export default UserCreateForm;
