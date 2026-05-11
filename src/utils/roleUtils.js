export const getUserRole = () => {
  return localStorage.getItem("role") || "admin";
};


export const setUserRole = (role) => {
  localStorage.setItem("role", role);
  window.location.reload();
};