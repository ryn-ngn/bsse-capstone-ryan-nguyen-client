import { MdDeleteForever } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './EventCard.scss';
import { localDateFormat } from '../../Utils/helper';

export default function EventCard({ event }) {
  let timeStamp = parseInt(event.eventDate);
  timeStamp = new Date(timeStamp).toLocaleDateString();

  return (
    <Card className="event-card">
      <Card.Header className="event-card__sub-heading">
        {event.eventType}
      </Card.Header>
      <Card.Body>
        <div className="non-word-info-group">
          <Card.Title>{timeStamp}</Card.Title>
          <Card.Text>{`$${event.eventCost}`}</Card.Text>
        </div>
        <Card.Text className="event-card__event-note">
          Work done: {event.eventNotes}
        </Card.Text>
        <MdDeleteForever className="event-card__delete-btn" />
      </Card.Body>
    </Card>
  );
}
