# teleport

📖 [Read in English](README.md)

🟢 [Versão ativa](https://tepe.pro/)

Essa é uma aplicação full-stack para encurtar URLs construída com as seguintes técnologias:

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

![Técnologias utilizadas](https://skillicons.dev/icons?i=nodejs,expressjs,mysql,react,tailwindcss)

Foi utilizado o [Render](https://render.com/) para fazer o deploy da versão ativa, que está disponível no domínio [tepe.pro](https://tepe.pro/).

## Como funciona

Toda vez que um request é feito, o backend possuí uma rota no `index.js` que captura qualquer string como um parâmetro de rota, e caso essa string for o `short_path` de alguma linha na tabela `redirects`, o backend vai redirecionar o request para o `destination_url` dessa mesma linha.

## Como fazer o build e rodar

Consulte o `README.md` dos diretórios [backend](backend/README.md) e [frontend](frontend/README.md).