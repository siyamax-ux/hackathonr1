const normalizeBaseUrl = (value) => (value ? value.replace(/\/$/, '') : '');

const getConfiguredBaseUrl = () => {
  const configured = normalizeBaseUrl(import.meta.env.VITE_API_URL || '');
  if (configured) return configured;
  return import.meta.env.DEV ? 'http://localhost:5000' : '';
};

export const getApiUrl = (path = '') => {
  const base = getConfiguredBaseUrl();
  return `${base}${path}`;
};

export const getSocketUrl = () => {
  const base = getConfiguredBaseUrl();
  return base || window.location.origin;
};
