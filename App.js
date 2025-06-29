
const { useState, useEffect } = React;
const apiKey = ac5c7d16;
const movieContainer = document.getElementById("movieContainer");
const defaultTitles = [
  "Inception", "Parasite", "The Dark Knight", "Pulp Fiction",
  "Interstellar", "Gladiator", "The Godfather", "Mad Max: Fury Road"
];

window.onload = () => {
  movieContainer.innerHTML = "";
  defaultTitles.forEach(fetchAndDisplay);
};

function fetchAndDisplay(title) {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`)
    .then(r => r.json())
    .then(data => {
      if (data?.Response === "True") renderCard(data);
    })
    .catch(console.error);
}

function renderCard(m) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <img src="${m.Poster !== "N/A"? m.Poster : 'https://via.placeholder.com/300x450'}" alt="Poster">
    <div class="movie-info">
      <h3>${m.Title}</h3>
      <p>${m.Year} • ⭐ ${m.imdbRating}</p>
      <p>${m.Genre}</p>
    </div>`;
  movieContainer.appendChild(card);
}

function searchMovie() {
  const q = document.getElementById("searchInput").value.trim();
  if (!q) return;
  movieContainer.innerHTML = "";
  fetchAndDisplay(q);
}
