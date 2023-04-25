import React, { useState, createContext } from "react";
import "./App.css";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import GameLobby from "./components/GameLobby";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {SocketContext, socket} from './utils/Socket';
export const UserDataContext = createContext()

function App() {
  //User name passed as props to login and used in Game lobby
  const [userName, setUserName] = useState(""); 
  const [userData, setUserData] = useState({gamesWon:0})
// console.log(userData,'user data in App.js');


  
  return (
    <SocketContext.Provider value={socket}>
      <UserDataContext.Provider value ={{setUserData}}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" exact element={<LandingPage userName={userName} setUserName={setUserName} />} />
              <Route path="Login" exact element={<Login userName={userName} setUserName={setUserName} />} />
              <Route path="ProfilePage" exact element={<ProfilePage />} />
              <Route
                path="GameLobby"
                exact
                element={
                  <GameLobby
                    userName={userName}
                    gamesWon={userData.gamesWon} _id={userData._id}
                  />
                }
              />
            </Routes>
          </Router>
        </div>
        </UserDataContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;