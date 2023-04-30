# API development with `nodejs`, `express` and `typescript` from scratch — Project Starter

Features:

- API documentation integrated via `apidoc` package. See [`/src/apis/hello`](/src/apis/hello/index.ts) for a quick example
- `eslint` and `prettier` built in so the code feels accordingly
- Automatic API registration dynamically ~ APIs are defined according to [`/src/apis`](/src/apis/) folder
- Strict type checking for `config`
- Built in error handling and `ApiError` to throw expected error like 'Bad Request' etc
- Built in `logger` to log various kinds of logs and organising them into files for hindsight analysation.

## How to use?

- `npm i`
- `npm run dev` for local development. Click [here](http://localhost:3000/) to see initial API docs page.
- `npm run start` for production use
