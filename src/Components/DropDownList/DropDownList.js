import Dropdown from 'react-bootstrap/Dropdown';

export default function DropDownList({ listName, list, handleSelected }) {
  const handleItemClick = (selectedItem) => {
    // Call the handleSelected function with the selected item
    handleSelected(selectedItem);
  };
  return (
    <Dropdown onSelect={handleItemClick}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {listName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {list.map((item, index) => (
          <Dropdown.Item key={index} eventKey={item}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
