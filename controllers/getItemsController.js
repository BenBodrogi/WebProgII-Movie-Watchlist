import { getAllMovies } from "../services/itemService.js";

export async function getItems(req, res, next) {
  try {
    const movies = await getAllMovies();
    res.json(movies);
  } catch (err) {
    next(err);
  }
}
