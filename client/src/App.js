import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import SignUP from './components/sign-up';
import MainPage from './components/mainpage';
import NavBar from './components/navbar';
import DashBoard from './components/dashboard';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<SignUP />} />
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/home' element={<DashBoard />} />
          <Route path='/employee-list' element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
