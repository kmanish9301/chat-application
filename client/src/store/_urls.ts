const envData = import.meta.env;

export const apiUrl = envData.VITE_REACT_APP_API_ENDPOINT
  ? envData.VITE_REACT_APP_API_ENDPOINT
  : "";
