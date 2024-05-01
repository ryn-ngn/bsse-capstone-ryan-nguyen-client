import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import FormField from '../../Components/FormInput/FormField';
import RegLogToggle from './RegLogToggle';

export default function UserForm({
  // isLoggedIn,
  showForm,
  setShowForm,
  handleSignup,
  handleLogin,
}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {showForm && (
        <div className="form-overlay">
          <div className="content d-grid gap-2">
            <form
              onSubmit={isRegister ? handleSignup : handleLogin}
              className="d-grid gap-2"
            >
              <RegLogToggle setIsRegister={setIsRegister} />
              {isRegister && (
                <FormField
                  htmlFor="firstName"
                  value={firstName}
                  onChangeAction={setFirstName}
                />
              )}

              <FormField
                htmlFor="userName"
                value={userName}
                onChangeAction={setUserName}
              />

              <FormField
                htmlFor="password"
                value={password}
                onChangeAction={setPassword}
              />
              <Button variant="primary" size="lg" type="submit">
                {isRegister ? 'Register' : 'Login'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
