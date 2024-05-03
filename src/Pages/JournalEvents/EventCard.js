import { MdDeleteForever } from 'react-icons/md';
import Card from 'react-bootstrap/Card';
import './EventCard.scss';

export default function EventCard({ journalEvent, handleDeleteCard }) {
  let timeStamp = parseInt(journalEvent.eventDate);
  timeStamp = new Date(timeStamp).toLocaleDateString();

  const handleDelete = () => {
    handleDeleteCard(journalEvent.eventId);
  };

  return (
    <Card className="event-card">
      <Card.Header className="event-card__sub-heading">
        {journalEvent.eventType}
      </Card.Header>
      <Card.Body>
        <div className="non-word-info-group">
          <Card.Title>{timeStamp}</Card.Title>
          <Card.Text>{`$${journalEvent.eventCost}`}</Card.Text>
        </div>
        <Card.Text className="event-card__event-note">
          Work done: {journalEvent.eventNotes}
        </Card.Text>
        <MdDeleteForever onClick={handleDelete} className="event-card__delete-btn" />
      </Card.Body>
    </Card>
  );
}
