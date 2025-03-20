import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getRedirectById, updateRedirect } from "../api/redirects";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import FormError from "./FormError";

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

function RedirectUpdateForm({
	redirect,
	setRedirects,
	setActiveRedirect,
	setIsEditing,
	token,
	notificate,
	isLoading,
	setIsLoading
}) {
	const {
    register,
    handleSubmit,
    formState: { errors },
		setError
  } = useForm({
    resolver: zodResolver(redirectSchema),
		defaultValues: {
			"shortPath": redirect.short_path,
			"destinationUrl": redirect.destination_url
		}
  });

	const onSubmit = async (data) => {
    try {
			setIsLoading(true);
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
			setIsEditing(false);
    } catch (error) {
			const message = error.response?.data.error;
      if (message === "Short path already taken") {
        setError("shortPath", { message });
        return;
      }
      notificate({
				message: "Error updating Redirect",
				type: "error"
			});
    } finally {
			setIsLoading(false);
		}
	};

	return (
		<form className="rounded-3xl border w-full min-w-fit max-w-96 px-4 py-6 flex flex-col gap-6 items-center h-fit" onSubmit={handleSubmit(onSubmit)}>
			<h3 className="text-3xl">Edit {redirect.short_path}</h3>
			<div className="flex flex-col gap-2">
        <div>
          <label>
            <span className="sr-only">Short path</span>
            <FormInput
              {...register("shortPath")}
            	placeholder="short path"
							disabled={isLoading}
            />
          </label>
          {errors.shortPath && <FormError>{errors.shortPath.message}</FormError>}
        </div>
  
        <div>
          <label>
            <span className="sr-only">Destination URL</span>
            <FormInput
              {...register("destinationUrl")}
			  type="url"
              placeholder="destination url"
							disabled={isLoading}
            />
          </label>
          {errors.destinationUrl && <FormError>{errors.destinationUrl.message}</FormError>}
        </div>
      </div>
      <FormButton
        type="submit"
				disabled={isLoading}
      >
        Update
      </FormButton>
		</form>
	);
}

export default RedirectUpdateForm;
