# To-Do API

This is a To-Do API built using **Domain-Driven Design (DDD)** principles, implemented in TypeScript. It provides functionality to create, list, update, and delete To-Do items. The application is designed with a clear separation of concerns and is Dockerized for easy deployment.

---

## Project Directory Structure

The project is structured following **DDD principles**, organizing the codebase into distinct layers: **Domain**, **Application**, **Infrastructure**, and **Interface**.

### Directory Layout

```plaintext
src/
├── application/            # Application layer: Use cases for business logic
│   ├── CreateTodo.ts       # Use case for creating a To-Do
│   ├── GetTodos.ts         # Use case for retrieving all To-Dos
│   ├── GetTodo.ts          # Use case for retrieving a specific To-Do by ID
│   ├── UpdateTodo.ts       # Use case for updating a To-Do
│   └── DeleteTodo.ts       # Use case for deleting a To-Do
│
├── domain/                 # Domain layer: Core business logic and rules
│   ├── entities/           # Defines the domain entities
│   │   └── Todo.ts         # To-Do entity with properties and behavior
│   ├── repositories/       # Repository interface for data access abstraction
│   │   └── TodoRepository.ts
│   └── shared/             # Shared types and utilities for the domain
│       ├── types/          # Commonly used type definitions
│       │   └── TodoTypes.ts # Enums and types related to To-Do status
│       └── helpers/        # Domain-related helpers and shared logic
|           └── ErrorHandler.ts # Middleware to handle errors globally
│           └── Errors.ts   # Custom error classes for domain rules
│
├── infrastructure/ # Infrastructure layer: Data persistence and external integrations
│   ├── storage/            # Implementations of data repositories
│   │   └── FileTodoRepository.ts # File system-based repository
│   └── data/               # JSON file to persist To-Do data
│       └── todos.json      # File to store To-Do items (created automatically)
│
├── interfaces/             # Interface layer: HTTP controllers and routes
│   ├── controllers/        # Handles incoming HTTP requests
│   │   └── TodoController.ts # Controller for To-Do API endpoints
│   └── routes/             # API routes
│       └── TodoRoutes.ts   # Defines routes for To-Do operations
│
├── dist/                   # Output directory for compiled TypeScript code
│   └── ...                 # Generated JavaScript files
│
├── .dockerignore           # Files and directories to ignore in Docker builds
├── .gitignore              # Files and directories to ignore in Git
├── Dockerfile              # Docker configuration for the application
├── package.json            # Project metadata and scripts
├── tsconfig.json           # TypeScript configuration file
└── README.md               # Project documentation
```

### Explanation of Key Directories

**src/application/:**
Contains use cases that define application-specific business logic.
Use cases orchestrate workflows by interacting with the domain layer and repositories.

**src/domain/:**
The core of the application.
Defines entities, such as Todo, which encapsulate the core business logic and rules.
Includes the TodoRepository interface to abstract data persistence.

**src/infrastructure/:**
Implements the infrastructure for data persistence and external services.
FileTodoRepository.ts provides a file-based implementation of the TodoRepository.

**src/interfaces/:**
Handles the interface between the application and external systems (e.g., HTTP requests).
Contains controllers and routes for exposing API endpoints.

**src/infrastructure/data/:**
Stores the todos.json file, which acts as the database for this project.

**dist/:**
Contains the compiled JavaScript files, generated from the TypeScript source code.

### Usage
Run the API:
Use npm run dev to start the API in development mode.
Use npm start to run the compiled application.

Docker:
Build the Docker image: npm run docker:build
Run the container: npm run docker:run

### Endpoints:

### Create a New To-Do

**Endpoint**: `/todos`
**Method**: `POST`
**Description**: Creates a new To-Do item.

**Request Body**
```json
{
  "content": "Complete project documentation",
  "dueDate": "2024-12-20T00:00:00.000Z"
}
```
**Response**
```json
{
  "message": "To-Do created successfully."
}
```

**Error Response**
```json
{
  "status": "error",
  "message": "Content is required."
}
```
```json
{
  "status": "error",
  "message": "Due date is required."
}
```

### List All To-Dos

**Endpoint**: `/todos`
**Method**: `GET`
**Description**: Retrieves all To-Do items sorted by createdAt in descending order.
**Response**
```json
{
  "status": "success",
  "message": "To-Dos fetched successfully",
  "data": [
    {
      "id": "92cb0a6b-ed36-4d16-aaaf-5f5ea2956d8e",
      "content": "Buy groceries",
      "dueDate": "2024-12-14T00:00:00.000Z",
      "status": "Unfinished",
      "createdAt": "2024-12-10T16:52:00.528Z",
      "updatedAt": "2024-12-10T16:52:00.528Z"
    }
  ]
}
```

### Get a Specific To-Do

**Endpoint**: `/todos/:id`
**Method**: `GET`
**Description**: Retrieves a single To-Do item by its ID.

**Request Parameters**
`id (string)`: The ID of the To-Do item.

**Response**
```json
{
  "status": "success",
  "message": "To-Do fetched successfully",
  "data": {
    "id": "92cb0a6b-ed36-4d16-aaaf-5f5ea2956d8e",
    "content": "Buy groceries",
    "dueDate": "2024-12-14T00:00:00.000Z",
    "status": "Unfinished",
    "createdAt": "2024-12-10T16:52:00.528Z",
    "updatedAt": "2024-12-10T16:52:00.528Z"
  }
}
```

**Error Response**
```json
{
  "status": "error",
  "message": "To-Do item not found."
}
```

### Update a To-Do

**Endpoint**: `/todos/:id`
**Method**: `PUT`
Description: Updates the content, status, or due date of an existing To-Do item.

**Request Parameters**

`id (string)`: The ID of the To-Do item.

**Request Body**
```json
{
  "content": "Update project documentation",
  "status": "Done",
  "dueDate": "2024-12-21T00:00:00.000Z"
}
```
**Response**
```json
{
  "message": "To-Do updated successfully."
}
```
**Error Response**
```json
{
  "status": "error",
  "message": "To-Do item not found."
}
```

### Delete a To-Do

**Endpoint**: `/todos/:id`
**Method**: `DELETE`
**Description**: Deletes an existing To-Do item.

**Request Parameters**

`id (string)`: The ID of the To-Do item.

**Response**
```json
{
  "message": "To-Do deleted successfully."
}
```

**Error Response**
```json
{
  "status": "error",
  "message": "To-Do item not found."
}
```

### Common Errors
`400 Bad Request`: Invalid inputs.
`404 Not Found`: Resource not found.
`500 Internal Server Error`: Unexpected server error.

### Running the API

**Development Mode:**

```bash
npm run dev
```

**Production Mode:**

```bash
npm run start
```

### Docker:

**Build the image:**
```bash
npm run docker:build
```
**Run the container:**
```bash
npm run docker:run
```