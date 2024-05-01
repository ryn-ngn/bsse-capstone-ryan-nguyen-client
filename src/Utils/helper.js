const headerWithJWT = () => {
  // Retrieve token from session storage
  const token = sessionStorage.getItem('JWTtoken');
  // Set headers with Bearer token
  return {
    Authorization: `Bearer ${token}`,
  };
};

module.exports = {
  headerWithJWT,
};
