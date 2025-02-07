import './assets/styles/index.scss';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { AllRoutes } from './routes/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <Header />
      <div className="main">
        <AllRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
