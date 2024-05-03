import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { headerWithJWT } from '../../Utils/helper';
import CarCard from './CarCard';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import './Collection.scss';
import NavBar from '../../Components/NavBar/NavBar';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Collection() {
  const { userId } = useParams();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const headers = headerWithJWT();
        const response = await axios.get(`${BASE_URL}/userCars/${userId}`, {
          headers,
        });
        setCollection(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collection:', error);
        setLoading(false);
      }
    };
    fetchCollection();
  }, [userId, collection.length]);

  // call this effect whenever the search query has a new input
  useEffect(() => {
    const filterCars = () => {
      const filtered = collection.filter((car) => {
        // Check if any car info matches the search query
        return Object.values(car).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setCollection(filtered);
    };
    filterCars();
  }, [searchQuery]);

  const handleAddCarToCollection = () => {
    navigate('/add-car');
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle search bar input
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // function to passdown to CarCard to update each car with other info
  // those info will be query from BE each time a CarCard is rendered

  return (
    <div className="collection  d-grid gap-2">
      <NavBar />
      <h1 className="collection__heading">Car Collection</h1>

      <InputGroup className="collection__search-box mb-3">
        <InputGroup.Text id="basic-addon1">
          <FaMagnifyingGlass />
        </InputGroup.Text>
        <Form.Control
          placeholder="Car filter"
          aria-label="car-filter"
          aria-describedby="basic-addon1"
          onChange={handleSearchInputChange}
        />
      </InputGroup>

      <div className="card-ctn">
        {collection.map((car) => (
          <CarCard key={`${car.carId}${Math.random()}`} carId={car.carId} />
        ))}
      </div>
      <Button
        className="collection__add-btn"
        variant="primary"
        size="lg"
        onClick={handleAddCarToCollection}
      >
        Add car to collection
      </Button>
      <div className="background"></div>
      <div className="overlay"></div>
    </div>
  );
}
