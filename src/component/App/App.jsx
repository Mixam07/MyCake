import { BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';
//import s from './App.module.css';
import Chess from '../Chess/Chess';

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/chess' element={<Chess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
