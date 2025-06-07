import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import Home from './pages/homePage';
import StartAnonymusDebate from './pages/startAnonymusDebate';
import StartDebate from './pages/startDebate';
import HowItWorks from './pages/howItWorks';
import Header from './components/header';
import DebateRoom from './pages/DebateRoom'
import ResultPage from "./pages/resultPage";
import UserProfile from "./pages/profilePage";

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
        <Route path="/debate-room/:roomId" element={<DebateRoom />} />
        <Route path="/result/:roomId" element={<ResultPage />} />
        <Route path="/profile" element={<UserProfile />}></Route>
      </Routes>
      

    </Router>
    </div>
  );
}

export default App;
