import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { apiConfig } from "../utils/apiConfig";

const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Set default axios headers whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      // Verify token and get user data
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Axios interceptor để handle token expired
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Chỉ logout khi token thực sự expired, không phải lỗi server khác
        if (
          error.response?.status === 401 &&
          (error.response?.data?.tokenExpired ||
            error.response?.data?.message?.includes("Token"))
        ) {
          console.log("🔐 Token expired, logging out...");
          logout();

          // Chỉ thông báo nếu không phải trang login
          if (!window.location.pathname.includes("/login")) {
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${apiConfig.baseURL}${apiConfig.endpoints.userProfile}`
      );
      setUser(response.data.data);
    } catch (error) {
      console.error("Error getting current user:", error);

      // Nếu token expired hoặc không hợp lệ, đăng xuất
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseURL}${apiConfig.endpoints.login}`,
        {
          email,
          password,
        }
      );

      const { data } = response.data;

      setUser(data);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || "Đăng nhập thất bại";
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseURL}${apiConfig.endpoints.register}`,
        {
          name,
          email,
          password,
        }
      );

      const { data } = response.data;

      setUser(data);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || "Đăng ký thất bại";
      return { success: false, message };
    }
  };

  const logout = () => {
    console.log("🚪 Logging out and clearing all tokens...");
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token"); // Clear session storage too
    delete axios.defaults.headers.common["Authorization"];
  };

  // Check if token is about to expire and refresh if needed
  const checkTokenValidity = () => {
    if (!token) return false;

    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      const timeUntilExpiry = tokenPayload.exp - currentTime;

      // If token expires in less than 5 minutes, consider it nearly expired
      if (timeUntilExpiry < 300) {
        console.log("Token sắp hết hạn, cần đăng nhập lại");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking token validity:", error);
      return false;
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await axios.put(
        `${apiConfig.baseURL}${apiConfig.endpoints.updateProfile}`,
        userData
      );
      const { data } = response.data;

      setUser(data);
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      }

      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || "Cập nhật thất bại";
      return { success: false, message };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    checkTokenValidity,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
