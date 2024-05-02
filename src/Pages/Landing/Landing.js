import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Landing.scss';
import Gallery from './Gallery';
import UserForm from './UserForm';

const baseUrl = process.env.REACT_APP_BASE_URL;
const registerUrl = `${baseUrl}/users/register`;
const loginUrl = `${baseUrl}/users/login`;

export default function Landing() {
  const [showForm, setShowForm] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(registerUrl, {
        userName: e.target.userName.value,
        firstName: e.target.firstName.value,
        password: e.target.password.value,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(loginUrl, {
        userName: e.target.userName.value,
        password: e.target.password.value,
      });

      setUserId(response.data.userId);
      sessionStorage.setItem('JWTtoken', response.data.Bearer);
      sessionStorage.setItem('userId', response.data.userId);

      setIsLoginError(false);
      setErrorMessage('');
      navigate(`/collection/${response.data.userId}`);
    } catch (error) {
      setIsLoginError(true);
      setErrorMessage(error.response.data.error.message);
    }
  };
  const handleShowForm = () => {
    setShowForm(true);
  };
  return (
    <div className="landing ">
      <Gallery />
      <div className="non-gallery-ctn d-grid gap-2">
        <h1 className="landing__heading">Fleet companion</h1>
        <p className="landing__text">
          A journal to keep track of your cars' maintenance history, costs, and
          expenses.
        </p>
        <Button
          className="landing__start-btn"
          variant="primary"
          size="lg"
          onClick={handleShowForm}
        >
          Get Started
        </Button>
        {isLoginError && <div>Something went wrong: ${errorMessage}</div>}
      </div>

      <UserForm
        setShowForm={setShowForm}
        showForm={showForm}
        // isLoggedIn={isLoggedIn}
        handleSignup={handleSignup}
        handleLogin={handleLogin}
      />
    </div>
  );
}
