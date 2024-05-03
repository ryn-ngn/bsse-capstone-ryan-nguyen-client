// https://react-bootstrap.netlify.app/docs/components/modal
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputGroup from 'react-bootstrap/InputGroup';
import { MdAttachMoney } from 'react-icons/md';
import { BsCalendar2Date } from 'react-icons/bs';
import axios from 'axios';
import { headerWithJWT } from '../../Utils/helper';

function AddEventModal({ carId, handleAddEvent }) {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [eventType, setEventType] = useState('');
  const [eventCost, setEventCost] = useState('');
  const [eventNotes, setEventNote] = useState('');
  const [addButtonVisible, setAddButtonVisible] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const userId = sessionStorage.getItem('userId');
  const headers = headerWithJWT();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTypeSelect = (event) => {
    setEventType(event.target.value);
  };

  const handleCostEntered = (event) => {
    setEventCost(event.target.value);
  };

  const handleNotesEntered = (event) => {
    setEventNote(event.target.value);
  };

  // add behaviour to the Add entry button
  // button will only be functional if all fields are entered
  useEffect(() => {
    if ((eventType, startDate, eventCost, eventNotes)) {
      setAddButtonVisible(true);
    } else setAddButtonVisible(false);
  }, [eventType, startDate, eventCost, eventNotes]);

  const handleSubmit = () => {
    handleAddEvent(startDate, eventType, eventCost, eventNotes);
    handleClose();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Entry
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="journal-events__event-type">
            <div className="mb-3">
              <Form.Check
                inline
                label="Break Fix"
                name="group1"
                type="radio"
                id={`inline-radio-1`}
                value={'break fix'}
                onChange={handleTypeSelect}
                checked={eventType === 'break fix'}
              />
              <Form.Check
                inline
                label="Regular Maintenance"
                name="group1"
                type="radio"
                id={`inline-radio-2`}
                value={'regular maintenance'}
                onChange={handleTypeSelect}
                checked={eventType === 'regular maintenance'}
              />
            </div>
          </Form>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <BsCalendar2Date />
            </InputGroup.Text>
            <DatePicker
              required
              selected={startDate}
              onChange={(date) => setStartDate(date.getTime())}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text size="lg">
              <MdAttachMoney />
            </InputGroup.Text>
            <Form.Control
              required
              type="number"
              aria-label="Amount (to the nearest dollar)"
              onChange={handleCostEntered}
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Text>Notes</InputGroup.Text>
            <Form.Control
              required
              as="textarea"
              aria-label="Notes"
              onChange={handleNotesEntered}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={!addButtonVisible}
            variant="primary"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEventModal;
