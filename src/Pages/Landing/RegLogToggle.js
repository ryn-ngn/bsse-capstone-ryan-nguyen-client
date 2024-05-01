import Form from 'react-bootstrap/Form';

function RegLogToggle({ setIsRegister }) {
  const handleToggle = (e) => {
    setIsRegister(e.currentTarget.checked);
  };

  return (
    <Form.Check
      type="switch"
      id="register-switch"
      label="Register"
      onChange={handleToggle}
    />
  );
}

export default RegLogToggle;
