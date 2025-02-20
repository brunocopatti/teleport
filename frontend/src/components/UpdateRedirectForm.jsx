import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getRedirectById, updateRedirect } from "../api/redirects";

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

function UpdateRedirectForm({ redirect, setRedirects, setActiveRedirect, token }) {
	const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(redirectSchema),
		defaultValues: {
			"shortPath": redirect.short_path,
			"destinationUrl": redirect.destination_url
		}
  });

	const onSubmit = async (data) => {
    try {
      const updatedRedirect = await updateRedirect(
				{ id: redirect.id },
				data,
				{ token }
			);
			const updatedActiveRedirect = await getRedirectById(
				{ id: redirect.id },
				{ token }
			);
			setRedirects((redirects) => (
				redirects.map((r) => (
					r.id === redirect.id ? updatedRedirect : r
				))
			));
			setActiveRedirect(updatedActiveRedirect);
    } catch (error) {
      console.error(error);
    }
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
        Update redirect
      </button>
		</form>
	)
}

export default UpdateRedirectForm;
