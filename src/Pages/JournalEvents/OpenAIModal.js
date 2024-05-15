import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { headerWithJWT } from '../../Utils/helper';
const BASE_URL = process.env.REACT_APP_BASE_URL;

function OpenAIModal({ carId }) {
  const [show, setShow] = useState(false);
  const [carInfo, setCarInfo] = useState(null);
  const [aiResponse, setAIResponse] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const headers = headerWithJWT();

  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cars/${carId}`, { headers });
        setCarInfo(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCarInfo();
  }, [show]);

  useEffect(() => {
    const fetchAIrespond = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/askOpenAI/${carInfo.make}/${carInfo.model}/${carInfo.year}`,
          { headers }
        );
        setAIResponse(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (carInfo) {
      fetchAIrespond();
      console.log(aiResponse);
    }
  }, [carInfo]);

  return (
    <>
      <Button
        className="ask-ai-btn"
        variant="outline-secondary"
        onClick={handleShow}
      >
        Parts & Info Recommended by AI
      </Button>

      {aiResponse && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Powered by OpenAI</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{`Wheel size: ${aiResponse.wheel_size}`}</p>
            <p>{`Bolt pattern: ${aiResponse.bolt_pattern}`}</p>
            <p>{`Wheel's center bore: ${aiResponse.center_bore}`}</p>
            <p>{`Standard tire size: ${aiResponse.tire_size}`}</p>
            <p>{`Left wiper blade size: ${aiResponse.left_wipe_blade}`}</p>
            <p>{`Right wiper blade size: ${aiResponse.right_wiper_blade}`}</p>
            <p>{`Oil type: ${aiResponse.oil_type}`}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default OpenAIModal;
