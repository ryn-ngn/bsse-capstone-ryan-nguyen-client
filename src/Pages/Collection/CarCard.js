import { useEffect, useState } from 'react';
import { headerWithJWT } from '../../Utils/helper';
import axios from 'axios';
import './CarCard.scss';
import CarInfo from '../../Components/CarInfo/CarInfo';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const UNSPLASH_URL = 'https://api.unsplash.com/';
const unsplashApiKey = 'hDupjXQjBGUgnZB_XlY11zlqiezc0AJ7lE8MR7ETMBk';
// const unsplashApiKey = process.env.REACT_APP_UNSPLASH_API_KEY;
// example car object received:
// {
//     "id": 654795,
//     "basemodel": "John Cooper Works",
//     "drive": "Front-Wheel Drive",
//     "make": "MINI",
//     "model": "John Cooper Works Convertible",
//     "trany": "Manual 6-spd",
//     "vclass": "Minicompact Cars",
//     "year": "2017"
// }
export default function CarCard({ carId, hideCarImg }) {
  const [carInfo, setCarInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        const headers = headerWithJWT();
        const response = await axios.get(`${BASE_URL}/cars/${carId}`, {
          headers,
        });
        setCarInfo(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car info:', error);
        setLoading(false);
      }
    };

    fetchCarInfo();
  }, []);

  // API usage is limited, had to commented out to limit usage
  useEffect(() => {
    const fetchUnSplashImg = async () => {
      try {
        const response = await axios.get(
          `${UNSPLASH_URL}/search/photos?query='${carInfo.make} ${carInfo.model}'&per_page=1&page=1&orientation=landscape&client_id=${unsplashApiKey}`
        );

        const regUrl = response.data.results[0].urls.regular;
        console.log('imgUrl', regUrl);
        setCarInfo((prevState) => ({
          ...prevState,
          imageUrl: regUrl,
        }));
      } catch (error) {
        console.error('Error fetching car image:', error);
        setLoading(false);
      }
    };
    if (!loading & !hideCarImg) {
      fetchUnSplashImg();
    }
  }, [loading]);

  const handleViewCar = (data) => {
    const userId = sessionStorage.getItem('userId');
    navigate(`/journal-events/${userId}/${data}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CarInfo
      className="collection-"
      carInfo={carInfo}
      deleteIconToggle={true}
      handleViewCar={handleViewCar}
    />
  );
}
