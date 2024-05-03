import NavBar from '../../Components/NavBar/NavBar';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { headerWithJWT } from '../../Utils/helper';
import { useParams } from 'react-router-dom';
import EventCard from './EventCard';
import './JournalEvents.scss';
import AddEventModal from './AddEventModal';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const userId = sessionStorage.getItem('userId');

export default function JournalEvents() {
  const [journalEvents, setJournalEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const headers = headerWithJWT();
  const { carId } = useParams();

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
        console.log(error);
      }
    };

    fetchJournalEvents();
  }, [journalEvents]);

  if (!journalEvents) {
    return <div>Loading...</div>;
  }

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

      {journalEvents.map((event) => (
        <EventCard key={event.eventId} event={event} />
      ))}

      <AddEventModal carId={carId} />
    </div>
  );
}
