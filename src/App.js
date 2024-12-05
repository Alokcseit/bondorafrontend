
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './component/Home';
import Signup from './component/Signup';
import Login from './component/Login';
function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  </Router>
  );
}

export default App;
