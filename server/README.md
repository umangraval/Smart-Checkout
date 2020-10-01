  <!-- Dependency Status -->
<h1 align="center">
  <a href="https://github.com/umangraval/Smart-Checkout"><img src="./brand_assets/banner.png" width=600 alt="Smart-Checkout"></a>
</h1>



<p align="center">

  <a href="https://dev-to-uploads.s3.amazonaws.com/i/2xg59r17v72yvqfb3wu5.jpg">
    <img src="https://forthebadge.com/images/badges/built-with-love.svg"
         alt="Javascript">
  </a>

  <a href="https://github.com/umangraval/Smart-Checkout">
    <img src="https://forthebadge.com/images/badges/uses-git.svg"
         alt="Git">
  </a>
    <a href="https://dev-to-uploads.s3.amazonaws.com/i/2xg59r17v72yvqfb3wu5.jpg">
    <img src="https://forthebadge.com/images/badges/made-with-javascript.svg"
         alt="Javascript">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#howto">How To Use</a> •
  <a href="#credits">Credits</a>
</p>

#### 1. Clone this repo

```
$ git clone git@github.com:umangraval/Smart-Checkout.git
$ cd your-app-name
```

#### 2. Install dependencies

```
$ npm i
```

## Development

### Start dev server
Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```
$ npm start
```
Running the above commands results in 
* 🌏**API Server** running at `http://localhost:8000`
* ⚙️**Swagger UI** at `http://localhost:8000/dev/api-docs`
* 🛢️**MongoDB** running at `mongodb://localhost:27017`

## Packaging and Deployment
#### 1. Build and run without Docker

```
$ npm run build && npm run start
```

#### 2. Run with docker

```
$ docker build -t api-server .
$ docker run -t -i -p 8000:8000 api-server
```

#### 3. Run with docker-compose

```
$ docker-compose up
```


---

## Environment
To edit environment variables, create a file with name `.env` and copy the contents from `.env.default` to start with.

| Var Name  | Type  | Default | Description  |
|---|---|---|---|
| NODE_ENV  | string  | `development` |API runtime environment. eg: `staging`  |
|  PORT | number  | `8000` | Port to run the API server on |
|  MONGO_URL | string  | `mongodb://localhost:27017/DBNAME` | URL for MongoDB |

## Logging
The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/logger.ts`.
* All logs are saved in `./logs` directory and at `/logs` in the docker container.
* The `docker-compose` file has a volume attached to container to expose host directory to the container for writing logs.
* Console messages are prettified
* Each line in error log file is a stringified JSON.


### Directory Structure

```
+-- scripts
|   +-- dev.sh
+-- src
|   +-- controllers
|   |   +-- product
|   |   |   +-- add.ts
|   |   |   +-- all.ts
|   |   |   +-- index.ts
|   |   |   +-- search.ts
|   +-- errors
|   |   +-- index.ts
|   +-- middleware
|   |   +-- request-middleware.ts
|   +-- models
|   |   +-- Product.ts
|   +-- app.ts
|   +-- mongo-connection.ts
|   +-- routes.ts
|   +-- server.ts
+-- .env
+-- .env.default
+-- .eslintrc.json
+-- .gitignore
+-- .travis.yml
+-- docker-compose.dev.yml
+-- docker-compose.yml
+-- Dockerfile
+-- jest.config.js
+-- nodemon.json
+-- openapi.json
+-- package-lock.json
+-- package.json
+-- README.md
+-- tsconfig.json
```
