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

function RedirectCreateForm({ token, setRedirects, notificate }) {
	const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError
  } = useForm({
    resolver: zodResolver(redirectSchema),
  });

	const onSubmit = async (data) => {
    try {
      const redirect = await createRedirect(data, { token });
      setValue("shortPath", "");
      setValue("destinationUrl", "");
      setRedirects((redirects) => (
        redirects.concat(redirect)
      ));
      notificate({ message: "Redirect created sucessfuly", type: "success" });
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
    }
	};

  return (
		<form className="rounded-3xl border w-full min-w-fit max-w-96 px-4 py-6 flex flex-col gap-6 items-center h-fit" onSubmit={handleSubmit(onSubmit)}>
			<h3 className="text-3xl">Create redirect</h3>
			<div className="flex flex-col gap-2">
        <div>
          <label>
            <span className="sr-only">Short path</span>
            <input
              className="border px-4 py-1 rounded-full w-60"
              {...register("shortPath")}
            placeholder="short path"
            />
          </label>
          {errors.shortPath && <p className="text-red-700">{errors.shortPath.message}</p>}
        </div>
  
        <div>
          <label>
            <span className="sr-only">Destination URL</span>
            <input
              className="border px-4 py-1 rounded-full w-60"
              {...register("destinationUrl")}
              placeholder="destination url"
            />
          </label>
          {errors.destinationUrl && <p className="text-red-700">{errors.destinationUrl.message}</p>}
        </div>
      </div>
      <button
        className="rounded-full px-8 py-2 bg-black text-white text-lg cursor-pointer"
        type="submit"
      >
        Create
      </button>
		</form>
	);
}

export default RedirectCreateForm;
