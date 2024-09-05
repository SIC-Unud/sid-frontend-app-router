import axios from 'axios';
import { API_BASE_URL } from './constant.util';
import next from 'next';

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
});

const axiosRefreshToken = axios.create({
	baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status == 403 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				await axiosRefreshToken.get('/api/public/generate-access-token', { withCredentials: true });

				return axiosInstance(originalRequest);
			} catch (error) {
				console.error(error);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
