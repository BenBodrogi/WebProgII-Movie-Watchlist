const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Animation"];

export function validateItem(req, res, next) {
  const { title, genre, watched, rating } = req.body;

  if (req.method === "POST") {
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!genre || !genres.includes(genre)) {
      return res.status(400).json({ error: "Genre is required and must be a valid option" });
    }
  }

  if (req.method === "PUT") {
    if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
      return res.status(400).json({ error: "Title must be a non-empty string" });
    }
    if (genre !== undefined && !genres.includes(genre)) {
      return res.status(400).json({ error: "Genre must be a valid option" });
    }
  }

  if (watched !== undefined && typeof watched !== "boolean") {
    return res.status(400).json({ error: "Watched must be a boolean" });
  }

  if (rating !== undefined && rating !== null) {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be a whole number between 1 and 5" });
    }
  }

  next();
}
