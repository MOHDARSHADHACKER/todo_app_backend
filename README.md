# Todo Backend

Simple Todo REST API backend built with Node.js, Express and MongoDB (Mongoose).

## About

This repository contains a small CRUD API for managing todos. It's a minimal backend used for demos or as a starter template.

## Prerequisites

- Node.js (14+ recommended)
- npm (bundled with Node.js)
- MongoDB running locally or remotely (default config points to a local MongoDB)

## Install

Open a PowerShell (or other shell) in the project root and run:

```powershell
npm install
```

## Run

Start the server with:

```powershell
# Run directly with node
node server.js

# or try npm start (note: package.json's start script is currently set to "server.js" — if that doesn't work, use the node command above)
npm start
```

Default server port: 4000 (can be overridden by setting the PORT environment variable).

MongoDB connection string is configured in `config/db.config.js` (default: `mongodb://localhost:27017/todo_db`).

## API Endpoints

Base URL: http://localhost:4000

- GET /                    - simple health/test route
- GET /api/todos           - list all todos (optional query: `?title=searchTerm` for case-insensitive title search)
- POST /api/todos          - create a new todo
- GET /api/todos/:id       - get a todo by id
- PUT /api/todos/:id       - update a todo by id
- DELETE /api/todos/:id    - delete a todo by id
- DELETE /api/todos        - delete all todos

Request/response shapes (example):

POST /api/todos
Request JSON body:

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```

Successful responses return the todo object (for create/read) or a message for update/delete operations.

### Examples (PowerShell)

Create a todo:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:4000/api/todos -ContentType 'application/json' -Body (@{title='Test todo'; description='desc'; completed=$false} | ConvertTo-Json)
```

Get all todos:

```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:4000/api/todos
```

Or with curl (Linux/macOS or Windows with curl available):

```bash
curl -X POST http://localhost:4000/api/todos -H "Content-Type: application/json" -d '{"title":"Buy milk","description":"2 liters","completed":false}'
curl http://localhost:4000/api/todos
```

## Project structure

- `server.js`               - application entrypoint
- `routes/todo.routes.js`   - Express routes for todos
- `controllers/todo.controller.js` - request handlers and business logic
- `models/todo.model.js`    - Mongoose model definition
- `models/index.js`         - mongoose connection wrapper
- `config/db.config.js`     - MongoDB connection string
- `package.json`            - project metadata and dependencies

## Notes / Troubleshooting

- Make sure MongoDB is running and accessible at the URL in `config/db.config.js`. If using a remote DB, update that file or modify the code to read DB URL from an environment variable.
- The `start` script in `package.json` is currently set to `"server.js"`. If `npm start` fails, run `node server.js` as shown above. To fix npm start behavior, change the script to:

```json
"scripts": {
  "start": "node server.js"
}
```

## Contributing

Contributions are welcome. Open an issue or submit a PR. Small suggestions:

- Add validation and better error responses
- Add environment-based configuration and secrets handling
- Add tests (unit/integration)

## License

This project uses the ISC license (see `package.json`).
