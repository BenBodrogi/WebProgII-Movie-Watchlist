import { updateMovie } from "../services/itemService.js";

export async function updateItem(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const updated = await updateMovie(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
