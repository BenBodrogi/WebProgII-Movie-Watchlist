let allMovies = [];
let currentFilter = "all";
let editingId = null;

const editModal = new bootstrap.Modal(document.getElementById("editModal"));

async function fetchMovies() {
  try {
    const res = await fetch("/api/movies");
    allMovies = await res.json();
    applyFilter();
  } catch (err) {
    console.error("Failed to load movies:", err);
    showAlert("Could not load movies", "danger");
  }
}

function applyFilter() {
  let movies = allMovies;

  if (currentFilter === "unwatched") {
    movies = allMovies.filter(m => !m.watched);
  } else if (currentFilter === "watched") {
    movies = allMovies.filter(m => m.watched);
  }

  renderMovies(movies);
  updateCounter();
}

function renderMovies(movies) {
  const list = document.getElementById("movieList");

  if (movies.length === 0) {
    list.innerHTML = '<div class="empty-state">Nothing here yet</div>';
    return;
  }

  list.innerHTML = movies.map(m => `
    <div class="movie-item ${m.watched ? "watched" : ""}">
      <span class="movie-title ${m.watched ? "done" : ""}">${m.title}</span>
      <span class="genre-badge">${m.genre}</span>
      <span class="stars">${getStars(m.rating)}</span>
      <button class="btn btn-sm btn-outline-success" onclick="toggleWatched(${m.id}, ${m.watched})">
        ${m.watched ? "✓ Watched" : "Mark watched"}
      </button>
      <button class="btn btn-sm btn-outline-light" onclick="openEdit(${m.id})">Edit</button>
      <button class="btn btn-sm btn-outline-danger" onclick="removeMovie(${m.id})">Delete</button>
    </div>
  `).join("");
}

function getStars(rating) {
  if (!rating) return "—";
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function updateCounter() {
  const count = allMovies.filter(m => !m.watched).length;
  document.getElementById("counter").textContent = `${count} to watch`;
}

function setFilter(filter) {
  currentFilter = filter;

  document.getElementById("filterAll").classList.remove("active");
  document.getElementById("filterUnwatched").classList.remove("active");
  document.getElementById("filterWatched").classList.remove("active");

  document.getElementById("filter" + filter.charAt(0).toUpperCase() + filter.slice(1)).classList.add("active");

  applyFilter();
}

async function addMovie() {
  const title = document.getElementById("titleInput").value.trim();
  const genre = document.getElementById("genreSelect").value;

  if (!title) {
    showAlert("Please enter a title", "warning");
    return;
  }
  if (!genre) {
    showAlert("Please select a genre", "warning");
    return;
  }

  try {
    const res = await fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, genre })
    });

    if (!res.ok) {
      const data = await res.json();
      showAlert(data.error, "danger");
      return;
    }

    document.getElementById("titleInput").value = "";
    document.getElementById("genreSelect").value = "";
    showAlert("Movie added!", "success");
    await fetchMovies();
  } catch (err) {
    console.error(err);
    showAlert("Something went wrong", "danger");
  }
}

async function toggleWatched(id, currentlyWatched) {
  try {
    const res = await fetch(`/api/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ watched: !currentlyWatched })
    });

    if (!res.ok) return;
    await fetchMovies();
  } catch (err) {
    console.error(err);
  }
}

async function removeMovie(id) {
  if (!confirm("Delete this movie?")) return;

  try {
    const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });

    if (!res.ok) {
      showAlert("Could not delete movie", "danger");
      return;
    }

    showAlert("Deleted", "success");
    await fetchMovies();
  } catch (err) {
    console.error(err);
  }
}

function openEdit(id) {
  const movie = allMovies.find(m => m.id === id);
  if (!movie) return;

  editingId = id;
  document.getElementById("editTitle").value = movie.title;
  document.getElementById("editGenre").value = movie.genre;
  document.getElementById("editRating").value = movie.rating ?? "";
  document.getElementById("editWatched").checked = movie.watched;

  editModal.show();
}

async function saveEdit() {
  const title = document.getElementById("editTitle").value.trim();
  const genre = document.getElementById("editGenre").value;
  const ratingVal = document.getElementById("editRating").value;
  const watched = document.getElementById("editWatched").checked;

  if (!title) {
    showAlert("Title can't be empty", "warning");
    return;
  }

  const rating = ratingVal === "" ? null : parseInt(ratingVal);

  try {
    const res = await fetch(`/api/movies/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, genre, watched, rating })
    });

    if (!res.ok) {
      const data = await res.json();
      showAlert(data.error, "danger");
      return;
    }

    editModal.hide();
    showAlert("Saved!", "success");
    await fetchMovies();
  } catch (err) {
    console.error(err);
    showAlert("Could not save changes", "danger");
  }
}

function showAlert(message, type) {
  const box = document.getElementById("alertBox");
  box.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3`;
  box.textContent = message;

  setTimeout(() => {
    box.classList.add("d-none");
  }, 3000);
}

document.getElementById("addBtn").addEventListener("click", addMovie);
document.getElementById("saveEditBtn").addEventListener("click", saveEdit);

document.getElementById("titleInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") addMovie();
});

fetchMovies();
