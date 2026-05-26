A full stack web app for keeping track of movies you want to watch or have already seen. Built for the Web Programming II course.

---

## Project Overview

You can add movies with a title and genre, mark them as watched, rate them from 1 to 5 stars, edit their details, and delete them. There are filters to view all movies, only the ones still on your to-watch list, or only the ones you have already seen. A counter at the top shows how many movies you still have left to watch. All data is saved on the server so it stays there between sessions.

---

## System Requirements

- **Node.js** v18 or higher
- **npm** v8 or higher
- A modern web browser (Chrome, Firefox, Edge)
- No database or cloud setup needed

---

## Technologies

- **Node.js + Express** — backend server and REST API
- **HTML, CSS, Vanilla JS** — frontend, no frameworks
- **Bootstrap 5** — UI and responsive layout
- **JSON file** — data stored locally on disk

---

## Features

- Add movies with a title and genre
- Mark movies as watched (and undo it)
- Rate movies from 1 to 5 stars
- Edit any movie's details
- Delete movies
- Filter by All / To Watch / Watched
- Counter for unwatched movies
- Client-side and server-side validation
- Success and error notifications
- Works on mobile too

---

## Installation & Running

**Step 1 — clone the repository**
```
git clone https://github.com/BenBodrogi/WebProgII-Movie-Watchlist
cd WebProgII-Movie-Watchlist
```

**Step 2 — install dependencies**
```
npm install
```

**Step 3 — start the server**
```
npm start
```

**Step 4 — open in browser**

Go to `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/movies | Get all movies |
| GET | /api/movies/:id | Get a single movie by ID |
| POST | /api/movies | Add a new movie |
| PUT | /api/movies/:id | Update an existing movie |
| DELETE | /api/movies/:id | Delete a movie |

### Movie object structure

```json
{
  "id": 1,
  "title": "Interstellar",
  "genre": "Sci-Fi",
  "watched": false,
  "rating": null,
  "addedAt": "2026-05-20T14:22:10.000Z"
}
```

Valid genres: `Action`, `Comedy`, `Drama`, `Horror`, `Sci-Fi`, `Romance`, `Thriller`, `Animation`

---

## Project Structure

```
WPII-movie-watchlist/
├── server/index.js          - starts the Express server
├── routes/itemRoutes.js     - defines all API routes
├── controllers/             - one file per route handler
├── middleware/              - validation and error handling
├── services/itemService.js  - reads and writes items.json
├── data/items.json          - where movies are stored
└── public/                  - frontend (HTML, CSS, JS)
```

---

## Troubleshooting

**Port 3000 is already in use**
Something else is running on that port. Either stop it or change the PORT variable in `server/index.js`.

**"Cannot find module" error on startup**
You probably skipped `npm install`. Run it and try again.

**Changes not saving / data resets**
Make sure the `data/` folder and `items.json` file are present and the process has write permissions to that directory.

**Page loads but movies don't appear**
Open the browser console and check for errors. Make sure the server is actually running and you are on `http://localhost:3000`, not opening the HTML file directly.

---

## Notes

Built for the Web Programming II course. The goal was to build a full stack CRUD application using Express on the backend and vanilla JavaScript on the frontend, following the layered architecture covered in lectures.
