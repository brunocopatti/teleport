# teleport

📖 [Leia em Português](README.pt.md)

🟢 [Live version](https://tepe.pro/)

This is a full-stack URL shortener built with the following technologies:

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

![Tools used](https://skillicons.dev/icons?i=nodejs,expressjs,mysql,react,tailwindcss)

The live version is deployed with [Render](https://render.com/) and it's available at the domain [tepe.pro](https://tepe.pro/).

## How it works

Everytime a request is made, the backend has a route at `index.js` that gets any string as a route parameter, and if this string is a `short_path` to any entry at the table `redirects`, the backend will return a redirect response to the `destination_url` of that entry.

## Building and running

Refer to the `README.md` from both [backend](backend/README.md) and [frontend](frontend/README.md) directories.