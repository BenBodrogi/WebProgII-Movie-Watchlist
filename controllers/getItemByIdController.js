import { getMovieById } from "../services/itemService.js";

export async function getItemById(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const movie = await getMovieById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    next(err);
  }
}
