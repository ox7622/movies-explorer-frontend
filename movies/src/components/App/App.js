
import './App.css';
import Main from '../Main/Main';
import { Route, Routes, useLocation } from 'react-router-dom';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useState } from 'react';

function App() {
  const location = useLocation();
  const { isLoading, setLoading } = useState(false);

  return (
    <div className='app'>
      {isLoading && <Preloader></Preloader>}
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='movies' element={<Movies />} />
          <Route path='saved-movies' element={<SavedMovies />} />
          <Route path='profile' element={<Profile />} />
          <Route path='signin' element={<Login />} />
          <Route path='signup' element={<Register />} />
          <Route path='404' element={<NotFoundPage />} />
        </Routes>

      </main>
      <Footer />
    </div>

  )
}

export default App;
