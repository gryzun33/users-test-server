# Users Server

## Downloading

Clone the project

```
git clone https://github.com/gryzun33/users-test-server.git

```

Go to folder with project

```
cd users-test-server
```

Check if you are in branch `develop`

## Installing NPM modules

```
npm install
```

## Preparing to running

In folder `frontend` rename file `.env.example` to `.env`

In folder `backend` rename file `.env.example` to `.env`

To create database (apply prisma migrations and add seeds)

```
npm run migrate:seed
```

## Running project

To run project in development mode, it's recommended to run frontend and backend in different terminals:

To run frontend:

```
npm run frontend
```

To run backend:

```
npm run backend
```
