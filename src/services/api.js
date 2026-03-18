const API_KEY = "b24c4db5";

export async function searchMovies(query) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );

    if (!response.ok) {
      throw new Error("Network error. Please try again.");
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error("No internet connection.");
    }
    throw error;
  }
}

export async function fetchMovieDetails(id) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
    );

    if (!response.ok) {
      throw new Error("Network error. Please try again.");
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error("No internet connection.");
    }
    throw error;
  }
}
