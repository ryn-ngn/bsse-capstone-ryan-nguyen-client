const headerWithJWT = () => {
  // Retrieve token from session storage
  const token = sessionStorage.getItem('JWTtoken');
  // Set headers with Bearer token
  return {
    Authorization: `Bearer ${token}`,
  };
};

const localDateFormat = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

module.exports = {
  headerWithJWT,
  localDateFormat,
};
