import { createMovie } from "../services/itemService.js";

export async function addItem(req, res, next) {
  try {
    const movie = await createMovie(req.body);
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
}
