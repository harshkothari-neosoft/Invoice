import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddInvoice from './components/AddInvoice';
import Setting from './components/Setting';
import Preview from './components/Preview';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/addinvoice" element={<AddInvoice/>}/>
          <Route path="/setting" element={<Setting/>}/>
          <Route path="/preview" element={<Preview/>}/>
          <Route path="*" element={<img width="100%" height="657px" src="./images/notfound.gif" alt="not found"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
