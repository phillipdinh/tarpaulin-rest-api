[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=11289458)
# File Structure
```
/tarpaulin-api
|-- /node_modules
|-- /src
|   |-- /controllers
|   |   |-- user.controller.js
|   |   |-- course.controller.js
|   |   |-- assignment.controller.js
|   |   |-- submission.controller.js
|   |-- /models
|   |   |-- user.model.js
|   |   |-- course.model.js
|   |   |-- assignment.model.js
|   |   |-- submission.model.js
|   |-- /routes
|   |   |-- user.routes.js
|   |   |-- course.routes.js
|   |   |-- assignment.routes.js
|   |   |-- submission.routes.js
|   |-- /middlewares
|   |   |-- auth.middleware.js
|   |   |-- error.middleware.js
|   |-- /services
|   |   |-- authService.js
|   |   |-- emailService.js
|   |   |-- uploadService.js
|   |   |-- redisService.js
|   |-- /utils
|   |   |-- apiError.js
|   |   |-- logger.js
|   |-- /config
|   |   |-- app.config.js
|   |   |-- db.config.js
|   |-- server.js
|-- /public
|-- /uploads
|-- /tests
|   |-- /integration
|   |-- /unit
|-- package.json
|-- package-lock.json
|-- .env
|-- .gitignore
|-- Dockerfile
|-- README.md
```
node_modules: Node.js dependencies.
src: API Source Code
controllers: API endpoint logic
models: Define the data models for your interacting directly with the database.
routes: Hold the route definitions of API endpoints.
middlewares: Middleware functions (authentication, error handling)
services: Business logic, encapsulating operations that interact with databases, external APIs, etc.
utils: Utility functions and classes that don't fit into other specific parts of the project structure.
config: Configuration files
public: Static files, such as HTML or CSS files, if needed.
server.js: Application entry point

