import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("TOKEN =", token);

    console.log("AUTH HEADER =", `Bearer ${token}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {
    console.log(
      "API ERROR:",
      error.response?.status,
      error.config?.url
    );

   if (error.response?.status === 401) {

  const user = JSON.parse(localStorage.getItem("user"));

  // Ignore 401 for hardcoded admin
  if (user?.role === "admin") {
    return Promise.reject(error);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
}

    return Promise.reject(error);
  }
);
// api.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");

//       // Optional redirect to login page
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

export default api;