# Tarpaulin REST API

Tarpaulin is a Rest API that is an "alternative" to Canvas. It provides data retrieval and manipulation endpoints to a 'school' database for students, teachers, and admininistrators. This API was developed using MySQL with Sequelize to maintain application data. Docker is used to containerize a Redis and MySQL server.

## File Structure

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
|   |-- /middlewares
|   |   |-- auth.middleware.js
|   |   |-- rate.middleware.js
|   |-- /services
|   |   |-- redisService.js
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

## Technologies Used

-   **Docker**: Containerization platform.
-   **Node.js**: Runtime environment for executing server-side code.
-   **Express.js**: Web application framework for Node.js, used for building REST APIs.
-   **Dotenv**: Used for loading environment variables from a .env file.
-   **MySQL2**: Database for storing application data.
-   **Sequelize**: ORM for Node.js.
-   **Redis**: Redis client for rate limiting.
-   **Morgan**: HTTP request logger middleware.
-   **JWT (JSON Web Tokens)**: Used for authentication and authorization.
-   **Bcrypt**: Used for hashing passwords.

## Features

-   **CRUD Operations**: Create, read, update, and delete users, courses, and assignments.
-   **Authentication and Authorization**: Secure endpoints with JWT-based authentication.
-   **Rate limiting**: Limits user use rates.
-   **File Download**: /courses/:id/roster endpoint creates a CSV file.

## Setup Instructions

Follow these steps to set up the project:

1. **Create a GitHub Codespace**:
2. **Create Docker Network**:

```bash
docker network create --driver bridge tarpaulin-net
```

3. **Create MySql Server**:

```bash
docker run -d --name mysql-server \
--network tarpaulin-net \
-p "3306:3306" \
-e "MYSQL_ROOT_PASSWORD=hunter2" \
-e "MYSQL_DATABASE=tarpaulin" \
-e "MYSQL_USER=tarpaulin" \
-e "MYSQL_PASSWORD=hunter2" \
mysql:latest
```

4. **Create Redis Server**:

```bash
docker run -d --name redis-server -p "6379:6379" redis:latest
```

5. **Initialize Database**:

```bash
npm run initdb
```

If error occurs create environmental variables then run above script:

```bash
export MYSQL_DATABASE="tarpaulin"
export MYSQL_USER="tarpaulin"
export MYSQL_PASSWORD="hunter2"
```

6. **Start the Server**:

```bash
npm start`
```

## Testing

1. Set port 8000 visibility to public.
2. Import [environment](tests/tarpaulin-api-environment.postman_environment.json) and [collection](tests/tarpaulin-api-tests.postman_collection.json) files to postman.
3. Set test environment to "Tarpaulin API Environment.
4. Set baseurl in postman environment to port 8000 url.
5. Send Student, Instructor, and Admin login requests (**Tarpaulin API Tests/users/login**)
6. Use responses to set environment tokens.
7. Explore endpoints!

To view database:

```bash
docker exec -it mysql-server /bin/bash
mysql -u tarpaulin -p
hunter2
```

## Entities

**Users**:

-   Attributes: **name, email, password, and role.**
-   Roles represents a different set of permissions to perform actions: **admin, instructor, and student**.

**Courses**:

-   Attributes: **subject, number, title, term, instructor.**

**Assignments**:

-   Attributes: **courseId, title, points, and due**.

**Submissions**:

-   Attributes: **assignmentId, studentId, timestamp, grade, and file**.

## Endpoints

### USERS

-   **POST /users**: Create a new user.
-   **POST /users/login**: User login.
-   **GET /users/:id**: Retrieve a user.

### Courses

-   **GET /courses**: Retrieve all courses
-   **POST /courses**: Create a new course
-   **GET /courses/:id**: Retrieve a course.
-   **PATCH /courses/:id** Update a course.
-   **DELETE /courses/:id** Delete a course.
-   **GET /courses/:id/students**: Retrieve all students in a course.
-   **POST /courses/:id/students**: Create a new student in a course.
-   **GET /courses/:id/roster**: Retrieve a CSV-formatted roster of students in a course.
-   **GET /courses/:id/assignments**: Retreive all assignments in a course.

### Assignments

-   **POST /assignments**: Create a new assignment.
-   **GET /assignments/:courseId** : Retrieve an assignment.
-   **PATCH /assignments/:courseId**: Update an existing assignment.
-   **DELETE /assignments/:courseId**: Delete an assignment.
-   **GET /assignments/:courseId/submissions**: Retrieve all submissions of an assignment.
-   **POST /assignments/:courseId/submissions**: Create a new submission for an assignment.
-   **GET /assignments/:courseId/submissions/:assignmentId**: Retrieve a submission.
-   **PATCH /assignments/:courseId/submissions/:assignmentId**: Update a submission.
-   **DELETE /assignments/:courseId/submissions/:assignmentId**: Delete a submission.

See [file](src/models/associations.js) for entity associations.
