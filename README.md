# UserBase

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

## Preparing to run

In folder `frontend` rename file `.env.example` to `.env`

In folder `backend` rename file `.env.example` to `.env`

To create database (apply prisma migrations and add seeds)

```
npm run migrate:seed
```

## Running the project

To run project in development mode, it's recommended to run frontend and backend in separate terminals:

To run frontend:

```
npm run frontend
```

To run backend:

```
npm run backend
```

To run frontend and backend in one terminal in development mode:

```
npm run dev
```

To build the project:

```
npm run build
```

To run project in production mode:

```
npm run start
```

## Notes

To check creating new user you can use photos from folder `public` in the root of repo
