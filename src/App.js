import logo from './logo.svg';
import './App.scss';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import ChatRoom from './components/ChatRoom/ChatRoom';

function App() {

  return (
    <> 
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<ChatRoom/>}/>
        <Route path="/Chatroom" element={<ChatRoom/>}/>
      </Routes>
    </>
  );
}

export default App;
