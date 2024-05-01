import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
const carImg1 = require('../../Assets/images/garett-mizunaka-xFjti9rYILo-unsplash.jpg');
const carImg2 = require('../../Assets/images/samuele-errico-piccarini-N_oLnW2ZotE-unsplash.jpg');
const carImg3 = require('../../Assets/images/yuvraj-singh-zKILixwL90A-unsplash.jpg');

const gallery = [carImg1, carImg2, carImg3];
export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    const prevIndex = (currentImageIndex - 1 + gallery.length) % gallery.length;
    setCurrentImageIndex(prevIndex);
  };

  const handleNextClick = () => {
    const nextIndex = (currentImageIndex + 1) % gallery.length;
    setCurrentImageIndex(nextIndex);
  };
  return (
    <div className="gallery">
      <img
        className="gallery__image"
        src={gallery[currentImageIndex]}
        alt={` ${currentImageIndex + 1}`}
      />
      <div className="gallery__navigation">
        <button className="prev-chevron" onClick={handlePrevClick}>
          <FaChevronLeft />
        </button>
        <button className="next-chevron" onClick={handleNextClick}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
