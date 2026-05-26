import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// same __dirname workaround as in index.js, needed for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// absolute path to the data file so it works regardless of where the process is started from
const FILE = path.join(__dirname, "../data/items.json");

async function read() {
  const data = await fs.readFile(FILE, "utf-8");
  return JSON.parse(data);
}

async function save(movies) {
  await fs.writeFile(FILE, JSON.stringify(movies, null, 2));
}

export async function getAllMovies() {
  return await read();
}

export async function getMovieById(id) {
  const movies = await read();
  return movies.find(m => m.id === id) || null;
}

export async function createMovie(data) {
  const movies = await read();
  // use max existing id + 1 so ids are never reused after a delete
  const newId = movies.length === 0 ? 1 : Math.max(...movies.map(m => m.id)) + 1;
  const movie = {
    id: newId,
    title: data.title.trim(),
    genre: data.genre,
    watched: data.watched ?? false,
    rating: data.rating ?? null,
    addedAt: new Date().toISOString()
  };
  movies.push(movie);
  await save(movies);
  return movie;
}

export async function updateMovie(id, data) {
  const movies = await read();
  const i = movies.findIndex(m => m.id === id);
  if (i === -1) return null;

  // only update fields that were actually included in the request body
  if (data.title !== undefined) movies[i].title = data.title.trim();
  if (data.genre !== undefined) movies[i].genre = data.genre;
  if (data.watched !== undefined) movies[i].watched = data.watched;
  if (data.rating !== undefined) movies[i].rating = data.rating;

  await save(movies);
  return movies[i];
}

export async function deleteMovie(id) {
  const movies = await read();
  const i = movies.findIndex(m => m.id === id);
  if (i === -1) return null;

  const [removed] = movies.splice(i, 1);
  await save(movies);
  return removed;
}
