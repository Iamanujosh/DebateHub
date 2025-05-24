import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import Home from './pages/homePage';
import StartAnonymusDebate from './pages/startAnonymusDebate';
import StartDebate from './pages/startDebate';
import HowItWorks from './pages/howItWorks';
import Header from './components/header';
import ChatWithTimer from './pages/ChatWithTimer'
function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-darkpurple  to-faintpurple">
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element = {<Login/>}></Route>
        <Route path="/signup" element = {<Signup/>}></Route>
        <Route path="/" element = {<Home />}></Route>
        <Route path="/startAnoymusDebate" element = {<StartAnonymusDebate />}></Route>
        <Route path="/startDebate" element = {<StartDebate />}></Route>
        <Route path="/how-it-works" element = {<HowItWorks />}></Route>
        <Route path="/debate-chat" element={<ChatWithTimer/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
