import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import itemRoutes from "../routes/itemRoutes.js";
import { errorHandler } from "../middleware/errorHandler.js";

// __dirname is not available in ES modules by default, so we derive it manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/movies", itemRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
