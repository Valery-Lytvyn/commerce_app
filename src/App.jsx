import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { router } from './routing/router';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/loader/Loader';
import { persistor } from './redux/store';

function App() {

  return (
    <>
      <PersistGate loading={<Loader />} persistor={persistor} />
      <RouterProvider router={router} />
    </>
  )
}

export default App
