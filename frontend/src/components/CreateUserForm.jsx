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

function CreateUserForm() {
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
      const user = await createUser(data);
      setValue("username", "");
      setValue("password", "");
      console.log("User created:", user);
    } catch (error) {
      console.error(error);
    }
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>Create user</h2>
			<div>
        <label>
          Username:
          <input
            {...register("username")}
            placeholder="Enter your username"
          />
        </label>
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label>
          Password:
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
          />
        </label>
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">
        Create user
      </button>
		</form>
	)
}

export default CreateUserForm;
