import { UserContext } from '../../contexts/User';
import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Main from '../Main/Main.jsx'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.jsx';
import Footer from '../Footer/Footer.jsx';
import { moviesApi } from '../../utils/MoviesApi';
import { myMoviesApi } from '../../utils/MainApi';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../../store/moviesSlice.js';

import { ownerFilter, filterById, movieFilter, durationFilter } from '../../utils/Filter';



const App = () => {

  const dispatch = useDispatch();

  const [loggedIn, setLoggedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  const [initialMovies, setInitialMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesAll, setSavedMoviesAll] = useState([]);

  const [error, sendError] = useState('');

  const [isLoading, setLoading] = useState(false);

  const [message, setMessage] = useState('');

  let [searchDone, setSearchDone] = useState(0);


  // const [checked, setChecked] = useState(false);
  // const [checkedSaved, setCheckedSaved] = useState(false);
  // const [input, setInputText] = useState('');

  const navigate = useNavigate();

  const signinUser = useCallback(async ({ email, password }) => {
    console.log(email, password);
    try {
      console.log(email, password);
      setLoading(true);
      const data = await myMoviesApi.login({ email, password });
      if (data) {

        const profile = await myMoviesApi.getProfileInfo();
        if (profile) {
          setSubmitted(true);
          setCurrentUser(profile);
          setLoggedIn(true);
          console.log(data);
          setMessage(data.message);
        }
      }
    }
    catch (err) {
      setSubmitted(true);
      if (err === '401 Unauthorized') {
        sendError('Неправильное имя пользователя и/ или пароль - ' + err);
      } else if (err === '429 Too Many Requests') {
        sendError('Превышен лимит попыток (больше 100 запросов за 15 мин). Подожидите немного и попробуйте еще раз - ' + err);
      }
      else {
        sendError(err);
      }

    }
    finally {
      setLoading(false);


    }
  }, [])



  const signupUser = useCallback(async ({ name, email, password }) => {
    setSubmitted(true);
    try {
      setMessage('');
      setLoading(true);
      const data = await myMoviesApi.register({ name, email, password });
      if (data) {
        window.localStorage.setItem('name', data.name);
        window.localStorage.setItem('email', data.email);
        signinUser({ email: data.email, password: password });

      }

    }

    catch (err) {

      sendError("Пользователь с таким email уже есть в базе - " + (err || err.message || err.meesage + err.statusCode));
    }

    finally {
      setLoading(false);

    }

  }, [signinUser])


  const signoutUser = useCallback(async () => {
    try {
      setMessage('');
      const res = await myMoviesApi.logout();
      debugger;
      if (res) {
        setLoggedIn(false);
        window.localStorage.setItem('name', '');
        window.localStorage.setItem('email', '');
        setMessage(res.message);
        const input = window.localStorage.getItem('input');
        if (input) {
          window.localStorage.setItem('input', '');
          window.localStorage.setItem('checked', '');
          window.localStorage.setItem('savedMoviesInitial', '');
          window.localStorage.setItem('moviesData', '');
          window.localStorage.setItem('savedMovies', '');
        }
      }

    } catch (err) {
      sendError("запрос на выход из аккаунта не выполнен: " + err);
    }
    finally {

    }

  }, [])

  const tokenCheck = useCallback(async () => {

    try {
      setLoading(true);

      const user = await myMoviesApi.checkToken();
      if (user) {

        setLoggedIn(true);
        setCurrentUser(user);
        navigate({ replace: false });
        //  setMessage('Вы успешно вошли');

      }
    } catch (err) {
      sendError(err);
    } finally {
      setLoading(false);
      console.log('profile changed 5');

    }
  }, []);



  const getMovies = useCallback(async () => {
    // // 


    //     try {
    //       setLoading(true);
    //       const prevSearch = window.localStorage.getItem('moviesData');

    //       let data = [];

    //       if (prevSearch) {
    //         data = JSON.parse(prevSearch);
    //       }
    //       else {
    //         data = await moviesApi.getMoviesData();
    //         if (data) {
    //           window.localStorage.setItem('moviesData', JSON.stringify(data));
    //         }
    //       }

    //       return data;

    //     }
    //     catch (err) {
    //       sendError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    //     }
    //     finally {
    //       setLoading(false);

    //     }
  }, [])



  const getSavedMovies = useCallback(async () => {
    try {
      setLoading(true);
      const savedMovies = await myMoviesApi.getMoviesData();

      const filter = ownerFilter(savedMovies, currentUser);

      setSavedMoviesAll(filter);
      setSavedMovies(filter);
      window.localStorage.setItem('savedMovies', JSON.stringify(filter));

    }

    catch (err) {
      sendError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    }
    finally {
      setLoading(false);
    }

  }, [currentUser]);



  const handleProfileChange = useCallback(async (data) => {
    setSubmitted(true);
    try {
      setLoading(true);
      const profile = await myMoviesApi.editProfileInfo(data);
      if (profile) {
        setCurrentUser(profile);
        setMessage('Профиль изменен!');
      }

    }
    catch (err) {

      sendError("запрос на обновление данных профиля не выполнен: " + err)
    }
    finally {
      setLoading(false);

    }
  }, [])




  const handleLikeClick = useCallback(async (movie) => {
    setSubmitted(true);
    try {

      const newMovie = await myMoviesApi.createMovie({
        imageURL: `https://api.nomoreparties.co${movie.image.url}`,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`, ...movie,
      });
      const movieUpd = [newMovie, ...savedMoviesAll];

      setSavedMovies(movieUpd);
      setSavedMoviesAll(movieUpd);
      window.localStorage.setItem('savedMovies', JSON.stringify(movieUpd));

      //setCheckedSaved(false)
    }
    catch (err) {
      sendError("Ошибка при отправке лайка " + err);

    }

  }, [savedMoviesAll])



  const deleteMovie = useCallback(async (movie) => {
    setSubmitted(true);
    try {
      const findMovie = savedMovies.find((i) => movie.id === i.id);

      await myMoviesApi.deleteMovie(findMovie._id);

      const filtered = filterById(savedMoviesAll, findMovie);
      setSavedMovies(filtered);
      setSavedMoviesAll(filtered);
    }
    catch (err) {
      sendError('Ошибка при удалении лайка фильма ' + movie.NameRU)

    }

  }, [savedMovies, savedMoviesAll])



  const handleDurationFilterSaved = useCallback(() => {
  //   setSubmitted(true);
  //   setLoading(true);
  //   let data = savedMovies;

  //   const moviesAll = savedMoviesAll;

  //   if (checkedSaved) {
  //     data = moviesAll;
  //  //   setCheckedSaved(false);

  //   } else {
  //     data = durationFilter(savedMovies);
  //  //   setCheckedSaved(true);

  //   }

  //   setSavedMovies(data);
  //   setLoading(false);
  //   setSearchDone(prev => prev + 1);

  }, [])




  const handleSearchSaved = useCallback(async (input) => {
    setSubmitted(true);
    setLoading(true);

    let data = savedMoviesAll;

    input = input.search.toLowerCase();


   // setCheckedSaved(false);
    data = movieFilter(data, input);

    setSavedMovies(data);
    window.localStorage.setItem('savedMovies', JSON.stringify(data));

    setLoading(false);
    setSearchDone(prev => prev + 1);

  }, [savedMoviesAll])



  //movies

  useEffect(() => {
    const inputText = window.localStorage.getItem('input');
    if (inputText) {
      setLoading(true);
      const checkedStatus = JSON.parse(window.localStorage.getItem('checked'));
      const moviesInitial = JSON.parse(window.localStorage.getItem('savedMoviesInitial'));

    //  setInputText(inputText);
    //  setChecked(checkedStatus);
      setInitialMovies(moviesInitial);
      setLoading(false);

    }

  }, [])



  const handleSearchMovies = useCallback(async (input) => {
    // setSubmitted(true);
    // try {

    //   setLoading(true);
    //   input = input.search.toLowerCase();
    //   const data =dispatch(fetchMovies());
    //   //const data = await getMovies();

    //   setChecked(false);

    //   const dataFiltered = movieFilter(data, input);

    //   setInitialMovies(dataFiltered);

    //   window.localStorage.setItem('moviesSearched', JSON.stringify(dataFiltered));
    //   setInputText(input);
    //   window.localStorage.setItem('input', input);
    //   window.localStorage.setItem('checked', JSON.stringify(false));
    //   window.localStorage.setItem('savedMoviesInitial', JSON.stringify(dataFiltered));
    //   setSearchDone(prev => prev + 1);
    // }
    // catch {

    // }
    // finally {
    //   setLoading(false);
    // }


  }, [getMovies])



  const handleDurationFilterMovies = useCallback(() => {
    // setSubmitted(true);
    // setLoading(true);
    // let data = initialMovies;
    // const moviesAll = JSON.parse(window.localStorage.getItem('moviesSearched'));
    // //   sendError('');
    // if (checked) {
    //   data = moviesAll;
    //   setChecked(false);
    //   window.localStorage.setItem('checked', JSON.stringify(false));
    // } else {
    //   data = durationFilter(initialMovies);
    //   setChecked(true);
    //   window.localStorage.setItem('checked', JSON.stringify(true));

    // }
    // window.localStorage.setItem('moviesShortFilter', JSON.stringify(data));

    // setInitialMovies(data);
    // setSearchDone(prev => prev + 1);
    // window.localStorage.setItem('savedMoviesInitial', JSON.stringify(data));
    // setLoading(false);
  }, [])



  useEffect(() => {
    tokenCheck();
    setMessage('');
    sendError('');
    console.log('profile changed1');
  }, [tokenCheck]);


  useEffect(() => {

   // setCheckedSaved(false);
    setSavedMovies(savedMoviesAll);
    console.log('profile changeв2');
  }, [savedMoviesAll])


  useEffect(() => {
    if (currentUser) {
      getSavedMovies();
      console.log('profile changed 3');
    }
  }, [currentUser, getSavedMovies])



  return (
    <UserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>

          <Route path='movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                // movies={initialMovies}
               // checked={checked}
               // input={input}
                savedMovies={savedMoviesAll}
                handleDurationFilterMovies={handleDurationFilterMovies}
                handleSearchMovies={handleSearchMovies}
                handleSetLike={handleLikeClick}
                handleDeleteLike={deleteMovie}
                loggedIn={loggedIn}
                isLoading={isLoading}
                searchDone={searchDone}
                error={error}
                submitted={submitted}
                sendError={sendError}
                setMessage={setMessage}
              />
            </ProtectedRoute>} />
          <Route path='saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                movies={savedMovies}
                handleDeleteLike={deleteMovie}
                loggedIn={loggedIn}
                durationFilterSaved={handleDurationFilterSaved}
                searchSaved={handleSearchSaved}
               // checked={checkedSaved}
                //setChecked={setChecked}
                isLoading={isLoading}
                searchDone={searchDone}
                error={error}
                submitted={submitted}
                sendError={sendError}
                setMessage={setMessage}
              />
            </ProtectedRoute>} />
          <Route path='profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                onSubmit={handleProfileChange}
                error={error}
                message={message}
                loggedIn={loggedIn}
                onLogout={signoutUser}
                isLoading={isLoading}
                submitted={submitted}
                sendError={sendError}
                setMessage={setMessage}
              />
            </ProtectedRoute>} />

          <Route path='signin' element={<Login error={error} message={message} onLogin={signinUser} isLoggedIn={loggedIn} submitted={submitted} />} />
          <Route path='signup' element={<Register onRegister={signupUser} error={error} isLoggedIn={loggedIn} message={message} submitted={submitted} />} />
          <Route path='/' element={<Main loggedIn={loggedIn} />} />
          <Route path='*' element={<NotFoundPage />} />

        </Routes>
        <Footer />

      </div >
    </UserContext.Provider>

  )
}

export default App;
