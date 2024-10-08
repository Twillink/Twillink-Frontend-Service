export const checkAuth = () => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');

  return {
    isLoggedIn: !!token,
    user: user ? JSON.parse(user) : null,
  };
};
