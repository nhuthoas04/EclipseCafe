// API configuration helper
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    // Drinks
    drinks: "/api/drinks",
    featuredDrinks: "/api/drinks/featured",
    drinkById: (id) => `/api/drinks/${id}`,
    toggleFeatured: (id) => `/api/drinks/${id}/featured`,
    uploadDrink: "/api/drinks/upload",

    // Users & Auth
    login: "/api/users/login",
    register: "/api/users/register",
    userProfile: "/api/users/profile",
    updateProfile: "/api/users/profile",
    googleAuth: "/api/auth/google/google",

    // Orders
    orders: "/api/orders",
    orderById: (id) => `/api/orders/${id}`,

    // Analytics
    analytics: "/api/analytics",
  },
};

// Helper function to build full URL
export const buildURL = (endpoint, params = {}) => {
  let url = `${API_BASE_URL}${endpoint}`;

  if (Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  return url;
};

// Helper function to get proper image URL
export const getImageURL = (imagePath) => {
  if (!imagePath) return null;

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it starts with uploads/, add the base URL
  if (imagePath.startsWith("uploads/")) {
    return `${API_BASE_URL}/${imagePath}`;
  }

  // Otherwise, assume it's in uploads folder
  return `${API_BASE_URL}/uploads/${imagePath}`;
};

// Common API client with default config
export const apiClient = {
  get: (endpoint, params = {}) => {
    return fetch(buildURL(endpoint, params));
  },

  post: (endpoint, data = {}, options = {}) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
  },

  put: (endpoint, data = {}, options = {}) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
  },

  delete: (endpoint, options = {}) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      ...options,
    });
  },
};

export default apiConfig;
