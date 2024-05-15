import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import './NavBar.scss';

function NavBar() {
  const userId = sessionStorage.getItem('userId');
  const [activeKey, setActiveKey] = useState('/home');

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey); // Update active key when link is selected
  };

  return (
    <Nav
      fill
      variant="tabs"
      defaultActiveKey="/"
      activeKey={activeKey}
      onSelect={handleSelect}
    >
      <Nav.Link eventKey="collection" href={`/collection/${userId}`}>
        Collection
      </Nav.Link>

      <Nav.Link eventKey="log-out" href="/">
        Log Out
      </Nav.Link>
    </Nav>
  );
}

export default NavBar;
