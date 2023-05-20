import './App.css';
import { UserContext } from '../../contexts/User';
import Main from '../Main/Main';
import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { myMoviesApi } from '../../utils/MainApi';
import { movieFilter, durationFilter } from '../../utils/Filter';
import useViewport from '../../hooks/useViewport';
import * as num from '../../constants/constants';

const App = () => {
  const location = useLocation();
  const moviesPage = (location.pathname === '/movies');

  const [loggedIn, setLoggedIn] = useState(false);

  const [movies, getMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const { width } = useViewport();
  const [moviesLimit, setMoviesLimit] = useState([]);
  const [initialStatus, setInitialStatus] = useState(false);

  const [savedMovies, getSavedMovies] = useState([]);
  const [error, sendError] = useState('');
  const [click, setClick] = useState(1);

  const [message, setMessage] = useState('');

  let [searchDone, setSearchDone] = useState(0);

  const [isLoading, setLoading] = useState(false);

  let [checked, setChecked] = useState(false);
  const [checkedSaved, setCheckedSaved] = useState(false);
  const [inputText, setInputText] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  function RequireAuth({ children, redirectTo }) {
    return loggedIn ? children : <Navigate to={redirectTo} replace />;
  }

  const signupUser = useCallback(async ({ name, email, password }) => {

    try {
      setMessage('');
      setLoading(true);
      const data = await myMoviesApi.register({ name, email, password });
      if (data) {
        window.localStorage.setItem('name', data.name);
        window.localStorage.setItem('email', data.email);
        setRegSuccess(true);
      }

    }
    catch (err) {
      sendError(err);
    }
    finally {
      setLoading(false);
    }

  })

  const signinUser = useCallback(async ({ email, password }) => {

    try {
      setMessage('');
      setLoading(true);
      const data = await myMoviesApi.login({ email, password });
      if (data) {

        const profile = await myMoviesApi.getProfileInfo();
        if (profile) {
          setCurrentUser(profile);
          setLoggedIn(true);
          setMessage(data.message);
        }
      }

    }

    catch (err) {
      sendError(err);
    }

    finally {
      setLoading(false);
    }
  })

  const signoutUser = useCallback(async () => {
    try {
      setMessage('');
      const res = await myMoviesApi.logout();
      if (res) {
        setLoggedIn(false);
        window.localStorage.setItem('name', '');
        window.localStorage.setItem('email', '');
        setMessage(res.message);
      }

    } catch (err) {
      sendError("запрос на выход из аккаунта не выполнен: " + err);
    }
    finally {
      setMessage('');
    }

  })

  const tokenCheck = useCallback(async () => {

    try {
      setLoading(true);

      const user = await myMoviesApi.checkToken();
      if (user) {

        setLoggedIn(true);
        setCurrentUser(user);
        setMessage('Вы успешно вошли');

      }
    } catch (err) {
      sendError(err);
    } finally {
      setLoading(false)
    }
  }, []);


  const handleProfileChange = useCallback(async (data) => {
    try {
      setLoading(true);
      const profile = await myMoviesApi.editProfileInfo(data);
      if (profile) {
        setCurrentUser(profile);

      }
      setMessage('Профиль изменен!');
    }
    catch (err) {
      sendError("запрос на обновление данных профиля не выполнен: " + err)
    }
    finally {
      setLoading(false);
    }
  })

  // setting likes on every search effect


  const setLikes = useCallback(() => {
    if (moviesPage) {
      console.log("LIKES");
      setLoading(true);
      myMoviesApi.getMoviesData().then(data => {

        getMovies(movies.map((movie) => {

          if (data.filter(i => i.id === movie.id).length > 0) {
            movie._id = data.filter(i => i.id === movie.id)[0]._id;
            movie.isLiked = true;

          } else {
            movie.isLiked = false;
          }
          return movie;
        }));

        window.localStorage.setItem('savedMovies', JSON.stringify(data));


      });
      setLoading(false);
    }

  })


  const handleSearchMovies = useCallback(async function (input) {

    try {
      sendError('');
      setLoading(true);
      setClick(1);
      let data = [];

      if (searchDone > 0) {
        data = await JSON.parse(window.localStorage.getItem('moviesData'));
      }
      else if (searchDone === 0) {
        data = await moviesApi.getMoviesData();
        if (data) {
          window.localStorage.setItem('moviesData', JSON.stringify(data));

        }
      }
      input = input.search.toLowerCase();

      setChecked(false);
      const dataFiltered = movieFilter(data, input);

      getMovies(dataFiltered);
      cardsLayotAdjust(dataFiltered);
      window.localStorage.setItem('moviesSearched', JSON.stringify(dataFiltered));
      setInputText(input);
      window.localStorage.setItem('input', input);
      window.localStorage.setItem('checked', JSON.stringify(false));
      window.localStorage.setItem('savedMoviesInitial', JSON.stringify(dataFiltered));

    }
    catch (err) {
      sendError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    }
    finally {
      setLoading(false);
      setSearchDone(searchDone + 1);

    }

  })



  const handleSearchSaved = useCallback(async function (input) {

    try {
      sendError('');
      setLoading(true);
      setClick(1);
      let data = await myMoviesApi.getMoviesData();

      input = input.search.toLowerCase();


      setCheckedSaved(false);
      data = movieFilter(data, input);

      getSavedMovies(data);
      window.localStorage.setItem('savedMovies', JSON.stringify(data));

    }
    catch (err) {

      sendError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    }
    finally {
      setLoading(false);
      setSearchDone(searchDone + 1);
    }
  })



  const handleDurationFilterMovies = useCallback(() => {

    let data = movies;
    const moviesAll = JSON.parse(window.localStorage.getItem('moviesSearched'));
    sendError('');
    if (checked) {
      data = moviesAll;
      setChecked(false);
      window.localStorage.setItem('checked', JSON.stringify(false));
    } else {
      data = durationFilter(movies);
      setChecked(true);
      window.localStorage.setItem('checked', JSON.stringify(true));

    }
    window.localStorage.setItem('moviesShortFilter', JSON.stringify(data));

    getMovies(data);
    cardsLayotAdjust(data);
    setSearchDone(prev => prev + 1);
    window.localStorage.setItem('savedMoviesInitial', JSON.stringify(data));

  })




  const handleDurationFilterSaved = useCallback(() => {

    let data = savedMovies;

    const moviesAll = JSON.parse(window.localStorage.getItem('savedMovies'));
    sendError('');
    if (checkedSaved) {
      data = moviesAll;
      setCheckedSaved(false);

    } else {
      data = durationFilter(savedMovies);
      setCheckedSaved(true);

    }

    getSavedMovies(data);
    setSearchDone(prev => prev + 1);

  })



  const handleLikeClick = useCallback(async (movie) => {


    try {
      setLoading(true);
      const likeStatus = savedMovies.filter(i => i.id === movie.id).length > 0;

      if (likeStatus) {
        const deletedMovie = await myMoviesApi.deleteMovie(movie._id);
        if (deletedMovie) {
          getSavedMovies(savedMovies.filter(item => item._id !== movie._id));
          movie.isLiked = false;

        }

      } else {
        const savedMovie = await myMoviesApi.createMovie({ imageURL: 'https://api.nomoreparties.co' + movie.image.url, thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url, ...movie });
        if (savedMovie) {
          getSavedMovies([savedMovie, ...savedMovies]);
          movie._id = savedMovie._id;
          movie.isLiked = true;

        }
      }

    }
    catch (err) {
      sendError(err);
    }

    finally {
      getMovies(movies);

      setLoading(false);
    }

  })




  const getInitialMovies = useCallback(() => {

    const input = window.localStorage.getItem('input');
    const checkedStatus = JSON.parse(window.localStorage.getItem('checked'));
    const moviesInitial = JSON.parse(window.localStorage.getItem('savedMoviesInitial'));

    if (input) {

      setInputText(input);
      setChecked(checkedStatus);
      getMovies(moviesInitial);
      cardsLayotAdjust(moviesInitial);
      console.log("moies init");
      setInitialStatus(true);
    }

    myMoviesApi.getMoviesData().then(data => {

      window.localStorage.setItem('savedMovies', JSON.stringify(data));
      getSavedMovies([...data]);
      console.log("saved moies init");
    }).catch((err) => sendError("Вы не авторизованы. скорее заходите на сайт!"));

  }, [loggedIn])



  const cardsLayotAdjust = useCallback((data) => {
    let dataLimit;
    if (click === 1) {
      if (width > num.WideScreenSize) {
        dataLimit = data.slice(0, num.ThreeColumnsLayout);
      } else if (width < num.WideScreenSize && width > num.TabletSize) {

        dataLimit = data.slice(0, num.TwoColumnsLayout);

      } else {
        dataLimit = data.slice(0, num.OneColumnLayout)

      }
    }
    else {
      let limit = JSON.parse(window.localStorage.getItem('moviesLimit'));
      dataLimit = data.slice(0, limit.length);
    }
    setMoviesLimit(dataLimit);


  });


  useEffect(() => {
    setLikes();
    window.localStorage.setItem('moviesLimit', JSON.stringify(moviesLimit));
    console.log(movies, savedMovies, 'movies2');
  }, [moviesLimit])




  const handleMore = useCallback(() => {
    setClick(0);
    let limit;
    const moviesLimit = JSON.parse(window.localStorage.getItem('moviesLimit'));

    if (width > num.WideScreenSize) {
      limit = (movies.slice(0, moviesLimit.length + 3));
    } else if (width < 1280 && width > num.TabletSize) {
      limit = (movies.slice(0, moviesLimit.length + 2));
    } else {
      limit = (movies.slice(0, moviesLimit.length + 1));
    }

    setMoviesLimit(limit);
    setClick(click + 1);

  });

  useEffect(() => {

    const timeout = setTimeout(cardsLayotAdjust(movies), 20000);
    return clearTimeout(timeout);

  }, [width])

  useEffect(() => {

    tokenCheck();
    setMessage('');
    sendError('');
    getInitialMovies();


  }, []);

  return (
    <div className='app'>
      <UserContext.Provider value={currentUser}>
        {isLoading && <Preloader />}
        <Header loggedIn={loggedIn} />
        <main>
          <Routes>

            <Route path='movies' element={
              <RequireAuth redirectTo='/'>
                <Movies
                  movies={movies}
                  moviesLimit={moviesLimit}
                  input={inputText}
                  isSearchDone={searchDone}
                  onShortSwitch={handleDurationFilterMovies}
                  checked={checked}
                  error={error}
                  handleLikeClick={handleLikeClick}
                  handleMore={handleMore}
                  onMoviesSearch={handleSearchMovies}

                />
              </RequireAuth>
            } />
            <Route path='saved-movies' element={
              <RequireAuth redirectTo='/'>
                <SavedMovies
                  savedMovies={savedMovies}
                  onMoviesSearch={handleSearchSaved}
                  handleLikeClick={handleLikeClick}
                  isSearchDone={searchDone}
                  onShortSwitch={handleDurationFilterSaved}
                  error={error}
                  checkedSaved={checkedSaved}

                />
              </RequireAuth>} />
            <Route path='profile' element={
              <RequireAuth redirectTo='/'>
                <Profile onSubmit={handleProfileChange} error={error} message={message} setMessage={setMessage} loggedIn={loggedIn} onLogout={signoutUser} />
              </RequireAuth>
            } />
            <Route path='/' element={<Main />} />
            <Route path='signin' element={<Login error={error} message={message} onLogin={signinUser} isLoggedIn={loggedIn} />} />
            <Route path='signup' element={<Register onRegister={signupUser} error={error} isRegistered={regSuccess} isLoggedIn={loggedIn} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>

        </main>
        <Footer />
      </UserContext.Provider>
    </div >

  )
}

export default App;
