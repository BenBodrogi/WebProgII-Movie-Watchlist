import { deleteMovie } from "../services/itemService.js";

export async function deleteItem(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const removed = await deleteMovie(id);
    if (!removed) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json({ message: "Movie deleted" });
  } catch (err) {
    next(err);
  }
}
