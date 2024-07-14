# Introduction
This is a backend service for Aegis Esports League of Legends operations. Its primary objective is to provide stats to players/teams and help admins manage rosters. It is a REST API that stores information about player stats, team stats, and information on leagues hosted by Aegis Esports.

# Getting Started
This guide and repo was created with the usage of **WSL 2.0** + **Ubuntu 22.04.4 LTS**. The following applications are required for development.
- Node - Latest LTS version (recommend [installing nvm](https://github.com/nvm-sh/nvm) and use `nvm install --lts` and `nvm use --lts`)
- [VSCode](https://code.visualstudio.com/download) - The preferred code IDE (the repo includes a .vscode directory).
  - Recommended VSCode extensions:
    - Git Graph
    - ESLint
    - GitLens (for Git blame annotations)
    - IntelliCode
    - Jest
    - Prettier
- [Docker Desktop](https://docs.docker.com/desktop/) - A local container setup for the application.
- [pgAdmin 4](https://www.pgadmin.org/download/pgadmin-4-windows/) - GUI access to a PostgreSQL databases.
- [Postman](https://www.postman.com/downloads/) - Platform to organize API requests.

While it is possible to run this project through only Windows by utilizing [nvm-windows](https://github.com/coreybutler/nvm-windows), Linux is the preferred environment for development. You can learn how to install [WSL 2.0 through this video](https://www.youtube.com/watch?v=A0eqZujVfYU), a Linux environment without the need of a VM.

### Installation

Once the repo is forked, run the following commands:
```
$ npm install
```
A directory `node_modules` will be created containing all the necessary dependencies.

### .env Files

In the root directory, create a `.env.development` file with the following content:

```
# NODE
NODE_ENV = development

# PORT
PORT = 5000

# LOG
LOG_FORMAT = dev
LOG_DIR = logs

# CORS
ORIGIN = *
CREDENTIALS = true

# DATABASE
DB_HOST = localhost
DB_USER = postgres
DB_PORT = 5432
DB_DB = dev
DB_PASSWORD = password
```

This is required to develop locally.<br>

### Launching the Server

Install Docker desktop. The Makefile executes the Docker commands to create a local container. Launch a local server through:
```
$ make up
```

This will create a local server and postgreSQL database on your computer. To verify that the container is running, run:
```
$ docker ps
```
You can also verify this by browsing Docker desktop. The server is also accessible through `http://localhost:3000` (port 3000).

If using WSL, [follow the instructions to enable WSL on Docker](https://docs.docker.com/desktop/wsl/#turn-on-docker-desktop-wsl-2).

### Postman

- The postman configurations for this project are located in TBD.

### pgAdmin 4

Once installed, use the following parameters to make a connection to your *local* postgreSQL server:
- **Host name/address:** localhost
- **Port:** 5432
- **Username:** postgres
- **Password:** password

The main database to access is `dev`. The application can be freely used to experiment queries and view data in a tabular form.

### Restarting / Shutting Down

If you install a new npm package, you need to reboot the container to see it take effect. Run the following commands to fully shutdown and remove the container.
```
$ make down
$ make remove
$ make clean
```

# Contributing

### JIRA

The active JIRA board is under 

### Branch Naming

All developmental branches should be merged into the `develop` branch, which is currently set to default.
Naming of branche s

### Testing

- Jest is currently the testing framework to conduct service tests. After implementing a new feature, you should also make test suites/cases to verify the feature's correctness. 
  - To test your code, run `npm run test`
  - To test a specific file, run `npm run test -- src/test/<file>.test.ts`
- **The database must be locally instantiated to run tests. Make sure `make db` or `make up` command has been used to create the db docker image.** If you see a `error: failed to push some refs to` message, that means your Docker container isn't running.

### Pushing Code

`husky` Git hooks:
- When *committing* code, a pre-commit hook will run ESLint and Prettier to enforce coding practices. VSCode settings should automatically format the code upon saving. Sometimes that may not be the case and the changes can happen after committing.

Though highly unadvised, the hooks can be temporarily disabled by:
```
$ HUSKY=0 git commit ... # To skip pre-commit hook
```

### API Documentation

The project utilizes [Swagger](https://swagger.io/specification/) to document HTTP API requests. The project's API documentation can be locally accessed through http://localhost:3000/docs when the local server is running.

Whenever a code change involves modifying/adding any API requests, the following needs to be done:
- Update the .yaml files in `/swagger`.

### Updating Database Schema

The database schema design is documented in [dbdiagram](https://dbdiagram.io/d/Run-Data-Service-657943c856d8064ca0ec2fc3).

Whenever a code change involves changing the database schema, the following needs to be done:
- Update `init.sql` in `/database`.
- Update the dbdiagram.
- Manually update the `db-prod`/`db-test` database.

# Project Structure

### Overview

The project was created through the [typescript-express-starter](https://github.com/ljlm0402/typescript-express-starter) boilerplate, using the `mikro-orm` setup.

All development files are stored under the directory `/src`.

```
    Start
      |
      |
     \|/
app.ts/server.ts ----> /routes ----> /controllers
                                          |
                                          |
                                         \|/
                     PostgreSQL <---- /services    
                         DB
```

All files below are prefixed with `/src`.

### Request Routing
- `/routes`
  - The list of API routes are first defined here.
- `/controllers`
  - Acts as the intermediate between routing and the service by returning the proper status codes.
- `/services`
  - The abstract that calls queries to the database. Each table should have their own file.

### Server/App Setup
- `/config`
  - Responsible for loading environmental variables.
- `/database`
  - Sets the database configurations and initializes it.

### Definitions
- `/dtos`
  - Object definition for the *inputs* and *outputs*.
  - Used to check validity of the body object for its respective PUT/POST requests (e.g. null checks).
  - Dto definitions should be reflected accurately in `/swagger`.
- `/entities`
  - Objects that exactly represent the database schema entity for `mikro-orm`.
- `/interfaces`
  - Interfaces are used to define a set of methods that a class or component must implement.
- `/exceptions`
  - Object definition for catching errors.

### Intermediates
- `/middlewares`
  - A layer that encompasses all requests, such as verifying data form, processing errors, authentication, etc. 
- `/utils`
  - Miscellaneous utilities, e.g. logging, validation, etc.

### Testing
- `/test`
  - Unit tests written in Jest that are compartmentalized by requests.

# TBD Notes/Concerns

### Environmental Variables

Implementation to have .env files be accessible to all environments is TBD (in lieu of just contacting doowan to retrieve them).<br>

### Postman

Creating a Postman team so that configurations for the project are accessible to everyone.

### Makefile Commands for Dev/Prod

There are Makefile commands to launch a container for dev and prod (mainly for deployment), but that has not been configured well enough to be used yet. It is mostly used for the server.
- **dev**: Connects to `db-test` database.
- **prod**: Connects to `db-prod` database.  

### Deployment

For now, whenever it is time for me to push to production, I would merge `develop` into `main`. Please don't do that yourself :') I'll handle it.

Need to think of a CD plan that will make it easier to deploy.

### Database Update

A proper method to migrate and properly update the production database is TBD.<br>
