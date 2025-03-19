import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authenticate } from "../api/auth";

const userSchema = z.object({
	username: z.string()
		.min(1, "Username must not be empty")
		.max(255, "Username must have less than 255 characters"),
	password: z.string()
		.min(1, "Password must not be empty")
		.max(255, "Password must have less than 255 characters")
});

function LoginForm({ setCredentials, notificate, setActiveRedirect }) {
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
      const credentials = await authenticate(data);
      setValue("username", "");
      setValue("password", "");
      setCredentials(credentials);
      setActiveRedirect(null);
    } catch (error) {
      notificate({ message: "Error authenticating", type: "error" });
    }
	};

	return (
		<form
      className="rounded-3xl border w-full min-w-fit max-w-96 px-4 py-6 flex flex-col gap-6 items-center h-fit bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
			<h3 className="text-3xl">Login</h3>
			<div className="flex flex-col gap-2">
        <div>
          <label>
            <span className="sr-only">Username</span>
            <input
              className="border px-4 py-1 rounded-full w-60"
              {...register("username")}
              placeholder="username"
            />
          </label>
          {errors.username && <p className="text-red-700">{errors.username.message}</p>}
        </div>
  
        <div>
          <label>
            <span className="sr-only">Password</span>
            <input
              className="border px-4 py-1 rounded-full w-60"
              type="password"
              {...register("password")}
              placeholder="password"
            />
          </label>
          {errors.password && <p className="text-red-700">{errors.password.message}</p>}
        </div>
      </div>
      <button
        className="rounded-full px-8 py-2 bg-black text-white text-lg cursor-pointer"
        type="submit"
      >
        Authenticate
      </button>
		</form>
	)
}

export default LoginForm;
