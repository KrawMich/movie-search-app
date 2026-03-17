const API_KEY = "b24c4db5";

export async function searchMovies(query) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
  );

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
}