import api from "./api";

export async function getMovies(positionOffset = 0) {
	const {
		data: { results },
	} = await api.get("/movie/popular");

	const now = new Date();
	const minutes = now.getUTCHours() * 60 + now.getUTCMinutes();
	const slot = Math.floor(minutes / 30);
	const index = (slot + positionOffset) % results.length;

	return results[index];
}

export async function getMoviesOne() {
	const {
		data: { results },
	} = await api.get("/trending/movie/day");

	return results;
}

export async function getTopMovies() {
	const {
		data: { results },
	} = await api.get("/movie/top_rated");

	return results;
}

export async function getSeries() {
	const {
		data: { results },
	} = await api.get("tv/popular");

	return results;
}

export async function getTopSeries() {
	const {
		data: { results },
	} = await api.get("/tv/top_rated");

	return results;
}

export async function getSeriesWithHighlight() {
	const series = await getSeries();

	if (!series || series.length === 0) {
		return { series: [], highlight: null };
	}

	const now = new Date();
	const minutes = now.getUTCHours() * 60 + now.getUTCMinutes();
	const slot = Math.floor(minutes / 30);
	const index = slot % series.length;
	const highlight = series[index];

	return { series, highlight };
}

export async function getSeriesVideos(seriesId) {
	async function fetchVideos(language) {
		try {
			const {
				data: { results },
			} = await api.get(`/tv/${seriesId}/videos`, {
				params: { language },
			});

			if (!results.length) return null;

			const trailer = results.find(
				(video) => video.type === "Trailer" && video.site === "YouTube",
			);

			return trailer || results[0];
		} catch (error) {
			console.error(
				`Erro ao buscar vídeos da série em ${language}:`,
				error.message,
			);
			return null;
		}
	}

	let video = await fetchVideos("pt-BR");

	if (!video) {
		video = await fetchVideos("en-US");
	}

	return video;
}

export async function getSeriesById(id) {
	try {
		const response = await api.get(`/tv/${id}`);
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar série por ID:", error);
		throw error;
	}
}

export async function getSeriesCredits(id) {
	try {
		const response = await api.get(`/tv/${id}/credits`);
		// retorna só o cast, ou array vazio para evitar erro
		return response.data.cast || [];
	} catch (error) {
		console.error("Erro ao buscar créditos da série:", error);
		return []; // retorna array vazio se erro
	}
}

export async function getSeriesSimilar(id) {
	try {
		const response = await api.get(`/tv/${id}/similar`);
		return response.data.results;
	} catch (error) {
		console.error("Erro ao buscar séries similares:", error);
		throw error;
	}
}


export async function getMovieVideos(movieId) {
	async function fetchVideos(language) {
		try {
			const {
				data: { results },
			} = await api.get(`/movie/${movieId}/videos`, {
				params: { language },
			});

			const trailer = results.find(
				(video) => video.type === "Trailer" && video.site === "YouTube",
			);

			return trailer || results[0] || null;
		} catch (error) {
			console.warn(`Erro ao buscar vídeos em ${language}:`, error.message);
			return null;
		}
	}

	let video = await fetchVideos("pt-BR");

	if (!video) {
		video = await fetchVideos("en-US");
	}

	return video;
}

export async function getMovieCredits(movieId) {
	const {
		data: { cast },
	} = await api.get(`/movie/${movieId}/credits`);

	return cast;
}

export async function getMovieSimilar(movieId) {
	const {
		data: { results },
	} = await api.get(`/movie/${movieId}/similar`);

	return results;
}

export async function getMovieById(movieId) {
	const { data } = await api.get(`/movie/${movieId}`);

	return data;
}

export async function getTrendingAnimes() {
	try {
		const totalPages = 2; // Buscar 3 páginas
		const allResults = [];

		for (let page = 1; page <= totalPages; page++) {
			const {
				data: { results },
			} = await api.get("/discover/tv", {
				params: {
					with_genres: 16,
					with_original_language: "ja",
					sort_by: "popularity.desc",
					page,
				},
			});
			allResults.push(...results);
		}

		return allResults;
	} catch (error) {
		console.error("Erro ao buscar animes em alta:", error);
		return [];
	}
}

export async function getAnimeVideos(animeId) {
  async function fetchVideos(language) {
    try {
      const {
        data: { results },
      } = await api.get(`/tv/${animeId}/videos`, {
        params: { language },
      });

      if (!results.length) return null;

      const trailer = results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      return trailer || results[0];
    } catch (error) {
      console.error(`Erro ao buscar vídeos do anime (${language}):`, error.message);
      return null;
    }
  }

  let video = await fetchVideos("pt-BR");
  if (!video) {
    video = await fetchVideos("en-US");
  }
  return video;
}



export async function getTopAnimes(page = 1) {
	try {
		const {
			data: { results },
		} = await api.get("/discover/tv", {
			params: {
				with_genres: 16,
				with_original_language: "ja",
				sort_by: "vote_average.desc",
				"vote_count.gte": 100, // Evita notas irreais com poucos votos
				page,
			},
		});
		return results;
	} catch (error) {
		console.error("Erro ao buscar top animes:", error);
		return [];
	}
}

export async function getAnimeById(animeId) {
  try {
    const { data } = await api.get(`/tv/${animeId}`, {
      params: {
        language: "pt-BR",
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do anime:", error);
    return null;
  }
}

export async function getAnimeCredits(animeId) {
  try {
    const { data } = await api.get(`/tv/${animeId}/credits`, {
      params: {
        language: "pt-BR",
      },
    });
    return data.cast || [];
  } catch (error) {
    console.error("Erro ao buscar créditos do anime:", error);
    return [];
  }
}

export async function getAnimeSimilar(animeId) {
  try {
    const { data } = await api.get(`/tv/${animeId}/similar`, {
      params: {
        language: "pt-BR",
      },
    });
    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar animes similares:", error);
    return [];
  }
}
