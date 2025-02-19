import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createRedirect } from "../api/redirects";

const redirectSchema = z.object({
	shortPath: z.string()
		.min(1, "Must not be empty")
		.max(20, "Must have less than 20 characters"),
	destinationUrl: z.string()
		.url({
			message: "Must be a full URL"
		})
    .max(255, "Must have less than 255 characters")
});

function CreateRedirectForm({ credentials, setRedirects }) {
	const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(redirectSchema),
  });

	const onSubmit = async (data) => {
    try {
      const redirect = await createRedirect(data, credentials);
      setValue("shortPath", "");
      setValue("destinationUrl", "");
      setRedirects((redirects) => (
        redirects.concat(redirect)
      ));
    } catch (error) {
      console.error(error);
    }
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>Create redirect</h2>
			<div>
        <label>
          Short path:
          <input
            {...register("shortPath")}
            placeholder="Enter the short path"
          />
        </label>
        {errors.shortPath && <p>{errors.shortPath.message}</p>}
      </div>

      <div>
        <label>
          Destination URL:
          <input
            {...register("destinationUrl")}
            placeholder="Enter the full destination URL"
          />
        </label>
        {errors.destinationUrl && <p>{errors.destinationUrl.message}</p>}
      </div>

      <button type="submit">
        Create redirect
      </button>
		</form>
	)
}

export default CreateRedirectForm;
