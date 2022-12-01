# AdventsKalendar (advent calendar), NodeJS (React + Express)
This is a demo App to learn frontend/backend interaction via REST API.

Express provides API routes and is configured to use CORS and a JSON body-parser middleware (for PUT calls). The backend connects and interacts asynchronously with MongoDB - in my case the db is running on the [Atlas](https://www.mongodb.com/docs/atlas/getting-started/) cloud. 

A React application acts as the frontend and makes API calls (via fetch) to the Express backend. React's JSX coupled with state changes allows for a quick and responsive rendering of each component.

Bootstrap is used for styling.

## Requirements
NodeJS + NPM

## Installation
Frontend: `npm install`  
Backend: `cd backend && npm install`

## Configuration
Add backend `PORT` and mongodb `URI` to `backend/.env`, like this:
```
PORT=3333
URI="mongodb+srv://<username>:<password>@<server>/?retryWrites=true&w=majority"
```

## Run
With **two** terminal windows opened:
1) Start backend: `cd backend && npm start`
2) Start frontend: `npm start`
