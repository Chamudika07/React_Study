import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Logins/Login'
import SingUp from './Components/SingUp/SingUp'
import Home from './Components/Home/Home';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SingUp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
