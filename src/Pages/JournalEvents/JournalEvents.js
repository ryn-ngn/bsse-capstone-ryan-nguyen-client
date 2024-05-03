import NavBar from '../../Components/NavBar/NavBar';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { headerWithJWT } from '../../Utils/helper';
import { useParams } from 'react-router-dom';
import EventCard from './EventCard';
import './JournalEvents.scss';
import AddEventModal from './AddEventModal';
import OpenAIModal from './OpenAIModal';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const userId = sessionStorage.getItem('userId');

export default function JournalEvents() {
  const [journalEvents, setJournalEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const headers = headerWithJWT();
  const { carId } = useParams();
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    const fetchJournalEvents = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/journalEvents/${userId}/${carId}`,
          {
            headers,
          }
        );
        setJournalEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJournalEvents();
  }, [reloadTrigger]);

  const handleDeleteCard = async (eventId) => {
    try {
      await axios.delete(`${BASE_URL}/journalEvents/${userId}/${carId}/${eventId}`, {
        headers,
      });
      setReloadTrigger((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  if (!journalEvents) {
    return <div>Loading...</div>;
  }

  const handleAddEvent = async (startDate, eventType, eventCost, eventNotes) => {
    try {
      const eventObj = {
        eventDate: startDate,
        eventType: eventType,
        eventCost: eventCost,
        eventNotes: eventNotes,
      };

      const response = await axios.post(
        `${BASE_URL}/journalEvents/${userId}/${carId}`,
        eventObj,
        { headers }
      );
      setReloadTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="journal-events d-grid gap-2">
      <NavBar />
      <h1 className="journal-events__heading">Maintenance Events</h1>
      <Form className="journal-events__filters">
        <div className="mb-3">
          <Form.Check
            inline
            label="Break Fix"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
          />
          <Form.Check
            inline
            label="Regular Maintenance"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
          />
          <Form.Check
            inline
            label="Both"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
          />
        </div>
      </Form>
      <OpenAIModal carId={carId} />
      {journalEvents.map((event) => (
        <EventCard
          key={event.eventId}
          journalEvent={event}
          handleDeleteCard={handleDeleteCard}
        />
      ))}
      <AddEventModal carId={carId} handleAddEvent={handleAddEvent} />
    </div>
  );
}
