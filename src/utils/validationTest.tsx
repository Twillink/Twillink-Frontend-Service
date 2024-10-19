export const testValidUsername = (username: string): boolean => {
  if (!username) {
    return true;
  }
  const regex = /^[a-zA-Z0-9._-]+$/;
  return regex.test(username);
};

export const testValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
