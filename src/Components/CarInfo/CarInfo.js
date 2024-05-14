import { MdDeleteForever } from 'react-icons/md';
import { MdAddShoppingCart } from 'react-icons/md';

export default function CarInfo({
  className,
  carInfo,
  deleteIconToggle,
  addIconToggle,
  handleAddCar,
  handleViewCar,
}) {
  const handleSelection = () => {
    if (deleteIconToggle) {
      handleViewCar(carInfo.id);
    } else {
      handleAddCar(carInfo.id);
    }
  };

  return (
    <>
      <div
        onClick={handleSelection}
        className={`${className}car-card`}
        id={carInfo.id}
      >
        {deleteIconToggle && (
          <div className={`${className}car-card__img-ctn`}>
            <img
              src={carInfo.imageUrl}
              alt={`unsplash search using ${carInfo.make} and ${carInfo.model}`}
            ></img>
          </div>
        )}
        <div className={`${className}car-card__info-ctn`}>
          <p>Year: {carInfo.year}</p>
          <p>Make: {carInfo.make}</p>
          <p>Model: {carInfo.model}</p>
          <p>Transmission: {carInfo.trany}</p>
        </div>
        {deleteIconToggle && (
          <MdDeleteForever
            // onClick={handleSelection}
            className={`${className}car-card__delete-icon`}
          />
        )}
        {addIconToggle && (
          <MdAddShoppingCart
            onClick={handleSelection}
            className={`${className}car-card__add-icon`}
          />
        )}
      </div>
    </>
  );
}
