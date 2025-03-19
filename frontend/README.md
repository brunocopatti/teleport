# Front-end

## Required environment variables

Add the following variables to your `.env` file:

- `VITE_API_URL`: Should be empty if frontend is being served by same server as backend.

## Social links

If you want to add social network links to the footer of the web application you can create a file at `src/assets/socials.json` with the following format:

```json
[
	{
		"name": "LinkedIn",
		"url": "https://linkedin.com/in/brunocopatti"
	},
	{
		"name": "GitHub",
		"url": "https://github.com/brunocopatti"
	},
	{
		"name": "Portfolio",
		"url": "https://brunocopatti.github.io"
	}
]
```