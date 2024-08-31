const API_BASE_URL = process.env.ENV == 'production' ? process.env.NEXT_PUBLIC_API_BASE_URL : 'http://localhost:3000/';

module.exports = { API_BASE_URL };
