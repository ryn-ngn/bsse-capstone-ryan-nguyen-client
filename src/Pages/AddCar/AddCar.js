import { useState, useEffect } from 'react';
import axios from 'axios';
import { headerWithJWT } from '../../Utils/helper';
import DropDownList from '../../Components/DropDownList/DropDownList';
import CarInfo from '../../Components/CarInfo/CarInfo';
import './AddCar.scss';
import NavBar from '../../Components/NavBar/NavBar';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const REQUEST_URL = `${BASE_URL}/cars/filter`;
export default function AddCar() {
  const [makeList, setMakeList] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [modelList, setModelList] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [yearList, setYearList] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [searchResults, setSearchResult] = useState(null);
  const headers = headerWithJWT();

  function useFetchEffect(url, setFunction, dependencies) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(url, {
            headers,
          });

          setFunction(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      if (dependencies.length === 0 || dependencies[0] !== '') fetchData();
    }, dependencies);
  }
  // retrieve car make list, always called on component load
  useFetchEffect(`${REQUEST_URL}/make`, setMakeList, []);

  // retrieve model search based on selected make
  // only called when make is selected
  useFetchEffect(`${REQUEST_URL}/${selectedMake}`, setModelList, [selectedMake]);

  // retrieve year search based on selected make and model
  // only called when make and model is selected
  useFetchEffect(`${REQUEST_URL}/${selectedMake}/${selectedModel}`, setYearList, [
    selectedModel,
  ]);

  useFetchEffect(
    `${REQUEST_URL}/${selectedMake}/${selectedModel}/${selectedYear}`,
    setSearchResult,
    [selectedYear]
  );

  // update selected make upon selection
  const handleMakeSelected = async (value) => {
    setSelectedMake(value);
  };

  // update selected model upon selection
  const handleModelSelected = async (value) => {
    setSelectedModel(value);
  };

  const handleYearSelected = async (value) => {
    setSelectedYear(value);
  };

  const handleCarAdd = async (data) => {
    console.log(data);
    const userId = sessionStorage.getItem('userId');
    try {
      const response = axios.post(
        `${BASE_URL}/userCars/${userId}`,
        { carId: data },
        { headers }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="add-car">
      <NavBar />
      <h1 className="add-car__heading">Add a car</h1>
      <div className="car-filters">
        <div className="car-filters__pair">
          <DropDownList
            listName="Car Make"
            list={makeList}
            handleSelected={handleMakeSelected}
          />
          <p className="car-filters__selection-txt">{selectedMake}</p>
        </div>

        <div className="car-filters__pair">
          <DropDownList
            listName="Car Model"
            list={modelList}
            handleSelected={handleModelSelected}
          />
          <p className="car-filters__selection-txt">{selectedModel}</p>
        </div>

        <div className="car-filters__pair">
          <DropDownList
            listName="Car Year"
            list={yearList}
            handleSelected={handleYearSelected}
          />
          <p className="car-filters__selection-txt">{selectedYear}</p>
        </div>
      </div>
      {searchResults?.map((result) => (
        <CarInfo
          key={result.id}
          carInfo={result}
          addIconToggle={true}
          className="add-"
          handleIconSelection={handleCarAdd}
        />
      ))}
    </div>
  );
}
