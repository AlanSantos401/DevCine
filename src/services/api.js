import axios from "axios";

const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	params: {
		api_key: "e10d22e879031c8add540f3a33112a05",
		language: "pt-BR",
		page: 1,
	},
});

export default api;
