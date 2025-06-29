const apiKey = ac5c7d16; // Replace with your actual OMDb API key
const movieContainer = document.getElementById("movieContainer");

// Default movies to show on home page
const defaultMovies = [
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Avengers: Endgame",
  "Titanic",
  "The Matrix",
  "Joker",
  "Forrest Gump"
];

function fetchMovie(title) {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "True") {
        const movieCard = `
          <div class="movie-card">
            <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/300x450'}" alt="Poster">
            <h3>${data.Title}</h3>
            <p>${data.Year} | ⭐ ${data.imdbRating}</p>
            <p>${data.Genre}</p>
            <p>${data.Plot.substring(0, 100)}...</p>
          </div>
        `;
        movieContainer.insertAdjacentHTML("beforeend", movieCard);
      }
    });
}

// Load default movies on home
window.onload = () => {
  movieContainer.innerHTML = "";
  defaultMovies.forEach(title => fetchMovie(title));
};

function searchMovie() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  movieContainer.innerHTML = ""; // Clear current movies
  fetchMovie(query);
}
