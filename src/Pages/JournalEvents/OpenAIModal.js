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
        setAIResponse(response.data.recommendations);
        console.log(aiResponse);
      } catch (error) {
        console.error(error);
      }
    };
    if (carInfo && !aiResponse) fetchAIrespond();
  }, [carInfo, aiResponse]);

  if (!carInfo || !aiResponse) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        AI Car Maintenance Suggestion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Powered by OpenAI</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`${aiResponse.recommendations}`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OpenAIModal;
