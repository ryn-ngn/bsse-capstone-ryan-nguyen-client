import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Landing from './Pages/Landing/Landing';
import Collection from './Pages/Collection/Collection';
import AddCar from './Pages/AddCar/AddCar';
import CarInfo from './Pages/CarInfo';
import JournalEvents from './Pages/JournalEvents/JournalEvents';
import AddJournalEvent from './Pages/AddJournalEvent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Car Collection */}
        <Route path="/collection/:userId" element={<Collection />} />

        {/* Add Car to Collection */}
        <Route path="/add-car" element={<AddCar />} />

        {/* Car info */}
        <Route path="/car-info" element={<CarInfo />} />

        {/* Service Journal Events */}
        <Route path="/journal-events/:userId/:carId" element={<JournalEvents />} />

        {/* Add journal events */}
        <Route path="/add-journal-events" element={<AddJournalEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
