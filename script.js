const apiKey = 'your_api_key_here'; // Replace with your actual OMDb API key

function searchMovie() {
  const query = document.getElementById('searchInput').value;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('movieDetails');

      if (data.Response === "False") {
        container.innerHTML = `<p>❌ Movie not found!</p>`;
        return;
      }

      container.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster}" alt="Poster" />
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
      `;
    })
    .catch(error => {
      document.getElementById('movieDetails').innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
