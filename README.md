# AdventsKalendar (advent calendar), React + Express


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
