const getApiBaseUrl = () => import.meta.env.VITE_API_URL || '';

export const getApiUrl = (path = '') => `${getApiBaseUrl()}${path}`;

export const getSocketUrl = () => import.meta.env.VITE_API_URL || window.location.origin;
